const { MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders"); //Also not an error - Ayden

module.exports.help = {
  name: "ping",
  cat: "Utility",
  description: "The command to make sure everything is working",
  aliases: "pong",
  data: new SlashCommandBuilder().setName("ping").setDescription("Pong!"),
};

//If interaction command
module.exports.interaction = async (interaction, client) => {
  const row = new MessageActionRow()
  .addComponents(
    new MessageButton()
      .setCustomId('latency')
      .setLabel('Get Latency')
      .setStyle("PRIMARY"),
  );

  await interaction.reply({ content: "Pong!", components: [row] });
  const filter = i => i.customId === 'latency' && i.user.id === interaction.user.id;
  const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
  collector.on('collect', async i => {
    await i.reply({ content: `🏓Latency is ${Date.now() - interaction.createdTimestamp}ms`, ephemeral: true, components: [] });
  });
};

//If normal command
module.exports.run = async (client, message, args) => {
  await message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms`);
};
