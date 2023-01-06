const { Client, Intents } = require("discord.js");
const Collection = require("@discordjs/collection");
const fs = require("fs");

const config = require("./config.json");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

//Command Handler
client.commands = new Collection.Collection();
client.aliases = new Collection.Collection();

//Command Folder location
client.handler = fs.readdirSync('./handlers/');

handlerfolder = client.handler;
handlerfolder.forEach(handler => {
    require(`./handlers/${handler}`);
}); // This all should work

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`${config.activity[Math.round(Math.random()*(config.activity.length-1))]} | m!help`);

  setInterval(function() {
      client.user.setActivity(`${config.activity[Math.floor(Math.random()*(config.activity.length-1))]} | m!help`);
  }, 60000) // Changed to 60 seconds due to the bot possibly being rate-limited
  
});

//When slash commands are ran

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
