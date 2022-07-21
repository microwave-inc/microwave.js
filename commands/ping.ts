const { SlashCommandBuilder } = require("@discordjs/builders"); //Also not an error - Ayden

module.exports.help = {
  name: "ping",
  description: "The command to make sure everything is working",
  aliases: "pong",
  data: new SlashCommandBuilder().setName("ping").setDescription("Pong!"),
};

//If interaction command
module.exports.interaction = async (interaction, client) => {
  return interaction.reply("Pong!");
};

//If normal command
module.exports.run = async (client, message, args) => {
  message.channel.send("Pong!");
};
