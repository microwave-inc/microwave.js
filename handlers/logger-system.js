const { Client, Intents } = require("discord.js");

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

//When slash commands are ran
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
  
    let commandFile = client.commands.get(interaction.commandName);
  
    if (commandFile) commandFile.interaction(interaction, client);

    // Now do the logging
    console.log(`Logger | ` + interaction.user.username + ` ran the command ` + commandFile + ` in ` + interaction.guild.name `with options` + interaction.options.data) // Very primitive for now, but should work
  });