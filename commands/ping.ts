const { SlashCommandBuilder } = require("@discordjs/builders"); //Also not an error - Ayden

module.exports.help = {
  name: "ping",
  cat: "Info",
  description: "The command to make sure everything is working",
  aliases: "pong",
  data: new SlashCommandBuilder().setName("ping").setDescription("Pong!"),
};

//If interaction command
module.exports.interaction = async (interaction, client) => {
  await interaction.reply("Pong!");
  await interaction.followUp({ content: `🏓Latency is ${Date.now() - interaction.createdTimestamp}ms`, ephemeral: true });
};

//If normal command
module.exports.run = async (client, message, args) => {
  await message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms`);
};
