const { Client, Intents } = require("discord.js");
const Collection = require("@discordjs/collection");
const fs = require("fs");

const config = require("./config.json");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.commands = new Collection.Collection();
client.aliases = new Collection.Collection();

//Load commands into memory
fs.readdir("./commands/", async (err, files) => {
  if (err) throw err;

  console.log("Started loading commands into memory");

  var fileName = files.filter((files) => files.split(".").pop() === "ts" || "js");

  //Add commands to the collection
  await fileName.forEach((fileName) => {
    let properties = require(`./commands/${fileName}`);

    let commandName = properties.help.name.toLowerCase();
    let aliasesName = properties.help.aliases.toLowerCase();

    client.commands.set(commandName, properties);
    client.aliases.set(aliasesName, properties);

    console.log(`${fileName} command loaded`);
  });

  console.log("Successfully loaded commands to memory");
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`Techno never dies`, { type: "PLAYING" }); //Update: Am dumb but I tried - Ayden
});

//When slash commands are ran
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  let commandFile = client.commands.get(interaction.commandName);

  if (commandFile) commandFile.interaction(interaction, client);
});

//When a message is sent
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (!message.content.startsWith(config.prefix)) return;
  let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  let cmd = args.shift().toLowerCase();

  let commandFile = client.commands.get(cmd);
  let commandAlias = client.aliases.get(cmd);

  if (commandAlias) commandAlias.run(client, message, args);
  if (commandFile) commandFile.run(client, message, args);
});

client.login(config.token);
