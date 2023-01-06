const fs = require("fs");
const Collection = require("discord.js");
const { Client, Intents } = require("discord.js");

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.commands = new Collection.Collection();
client.aliases = new Collection.Collection();

//Load commands into memory
fs.readdir("./commands/", async (err, files) => {
    if (err) throw err;

    console.log("Loader | Started loading commands into memory");

    var fileName = files.filter((files) => files.split(".").pop() === "ts" || "js");

    //Add commands to the collection
    await cat.forEach((cat) => {
        let properties = require(`./commands/${cat}/${fileName}`);

        let commandName = properties.help.name.toLowerCase();
        let aliasesName = properties.help.aliases.toLowerCase();

        client.commands.set(commandName, properties);
        client.aliases.set(aliasesName, properties);

        console.log(`${fileName} command loaded`);
});});

console.log("Loader | Successfully loaded commands to memory");


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

// Gonna leave this unfinished untill I get a lot of time to work on it