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
        .addFields({ name: "Result", value: `${Math.floor(Math.random() * 2) == 0 ? "Heads" : "Tails"}` })
        .setTimestamp()
    interaction.reply({ embeds: [embed] });
}

module.exports.run = async (client, message, args) => {
    await message.channels.send("Hello! We have moved fully away from prefixed commands, please use the slash commands instead!")
}
