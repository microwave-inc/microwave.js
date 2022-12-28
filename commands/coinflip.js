const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports.help = {
    name: "coinflip",
    cat: "Fun",
    description: "Flip a coin",
    aliases: "",
    data: new SlashCommandBuilder().setName("coinflip").setDescription("Flip a coin"),
}

module.exports.interaction = async (interaction, client) => {
    const embed = new MessageEmbed()
        .setColor("#FFFFFE")
        .setTitle("Coinflip")
        .setURL("https://microwavebot.tech/discord")
        .setTitle("**Coinflip:**")
        .setColor("#9603fd")
        .addField("Result", `${Math.floor(Math.random() * 2) == 0 ? "Heads" : "Tails"}`, true)
        .setTimestamp()
    interaction.reply({ embeds: [embed] });
}

module.exports.run = async (client, message, args) => {
    const embed = new MessageEmbed()
        .setColor("#FFFFFE")
        .setTitle("Coinflip")
        .setURL("https://microwavebot.tech/discord")
        .setTitle("**Coinflip:**")
        .setColor("#9603fd")
        .addField("Result", `${Math.floor(Math.random() * 2) == 0 ? "Heads" : "Tails"}`, true)
        .setTimestamp()
    message.channel.send({ embeds: [embed] });
}