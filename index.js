const { Client, Intents, Collection } = require("discord.js");
const fs = require("fs");

const config = require("./config.json");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.commands = new Collection();

const commandFolders = fs.readdirSync('./commands');
const handlerFiles = fs.readdirSync('./handlers').filter(file => file.endsWith('.js'));

for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    const commandName = command.help.name.toLowerCase();
    console.log(`-----------------------------`);
    console.log(`| Loaded command: ${commandName} |`);
    console.log(`| Command category: ${command.help.cat} |`);

    client.commands.set(commandName, command);
    };
  };
console.log(`----------------------------`)
console.log("Successfully loaded commands to memory");

/* // Commented out for now
const handlers = new Collection();
for (const file of handlerFiles) {
  const handler = require(`./handlers/${file}`);
  handlers.set(handler.name, handler);
  console.log(`Loaded handler ${handler.name}`);
}
*/


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(
    `${config.activity[Math.round(Math.random() * (config.activity.length - 1))]} | m!help`
  );

  setInterval(function () {
    client.user.setActivity(
      `${config.activity[Math.floor(Math.random() * (config.activity.length - 1))]} | m!help`
    );
  }, 60000); // Changed to 60 seconds due to the bot possibly being rate-limited
});

// When slash commands are ran
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  const blacklistjson = require("./blacklist.json");

  if (blacklistjson.includes(interaction.user.id)) {
    interaction.reply({ content: "You are blacklisted from using this bot. \n\n You can appeal in the main discord.", ephemeral: true })
  }; // checks if user is blacklisted

  if (!command) return;

  try {
    await command.interaction(interaction, client);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

// When a message is sent
client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName) || client.aliases.get(commandName);

  if (!command) return;

  try {
    await command.run(client, message, args);
  } catch (error) {
    console.error(error);
    await message.reply("There was an error while executing this command!");
  }
});

client.login(config.token);
