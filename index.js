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


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(
    `${config.activity[Math.round(Math.random() * (config.activity.length - 1))]} | m!help`
  );

  setInterval(function () {
    client.user.setActivity(
      `${config.activity[Math.floor(Math.random() * (config.activity.length - 1))]} | m!help`
    );
  }, 5000);
});

// When slash commands are ran
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.interaction(interaction, client);
    console.log(`Command ${interaction.commandName} was ran by ${interaction.user.tag} (${interaction.user.id})`); // Logs the command
  } catch (error) {
    console.error(error);
    if (interaction.deferred) {interaction.editReply({ content: "There was an error while executing this command!", ephemeral: true }); return};
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

// Error handlers to prevent randomly closing

client.on("error", (error) => {
  console.log(`[ERROR] ` + error.stack);
});

client.on("warn", (info) => {
  console.log(`[INFO] ` + info);
});

client.login(config.token);
