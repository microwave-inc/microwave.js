const { MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders"); //Also not an error - Ayden

module.exports.help = {
  name: "ping",
  cat: "Utility",
  description: "The command to make sure everything is working",
  aliases: "pong",
  cmdid: "1080020862335455324",
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
  const rowdisabled = new MessageActionRow()
  .addComponents(
      new MessageButton()
          .setCustomId('latencydisabled')
          .setLabel('Got Latency')
          .setStyle("SUCCESS")
          .setDisabled(true),
  );

  await interaction.reply({ content: "Pong!", components: [row] });
  /*const filter = i => i.customId === 'latency' && i.user.id === interaction.user.id;
  const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
  collector.on('collect', async i => {
    await i.update({ content: `🏓Latency is ${Date.now() - interaction.createdTimestamp}ms`, components: [rowdisabled] }).catch(err => {console.log(err); return})
  });*/
};

//If normal command
module.exports.run = async (client, message, args) => {
  await message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms`);
};
