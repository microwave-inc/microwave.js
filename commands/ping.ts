const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports.help = {
  name: "ping",
  description: "The command to make sure everything is working",
  aliases: "pong",
  data: new SlashCommandBuilder().setName("ping").setDescription("The test command"),
};

//If interaction command
module.exports.interaction = async (interaction, client) => {
  return interaction.reply("Pong!");
};

//If normal command
module.exports.run = async (client, message, args) => {
  message.channel.send("Pong!");
};
