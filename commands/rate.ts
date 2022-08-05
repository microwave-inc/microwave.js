const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports.help = {
    name: "rate",
    cat: "Fun",
    description: "Rate something",
    aliases: "",
    data: new SlashCommandBuilder()
    .setName("rate")
    .setDescription("Rate something")
    .addStringOption(option => {
        return option
        .setName("rate")
        .setDescription("The thing to rate")
        .setRequired(true)
    }),
}

module.exports.interaction = async (interaction, client) => {
    const rate = interaction.options.getString("rate")
    const embed = new MessageEmbed()
    const rated = Math.floor(Math.random() * 101)

    if (rated > 50) {
        embed.setTitle(`I like ${rate}`)
    } else {
        embed.setTitle(`I don't like ${rate}`)
    }
    embed.setDescription(`I'd rate ${rate} ${rated}/100`)
    embed.setColor("#FFFFFF")

    interaction.reply({ embeds: [embed] })
}

module.exports.run = async (client, message, args) => {
    const rate = args.join(" ")
    const embed = new MessageEmbed()
    const rated = Math.floor(Math.random() * 101)

    if (rated > 50) {
        embed.setTitle(`I like ${rate}`)
    } else {
        embed.setTitle(`I don't like ${rate}`)
    }
    embed.setDescription(`I'd rate ${rate} ${rated}/100`)
    embed.setColor("#FFFFFF")

    message.channel.send({ embeds: [embed] })
}