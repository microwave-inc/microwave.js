const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports.help = {
    name: "about", 
    cat: "Info",
    description: "Get information about the bot",
    aliases: "",
    data: new SlashCommandBuilder().setName("about").setDescription("Get information about the bot"),
}

module.exports.interaction = async (interaction, client) => {
    const embed = new MessageEmbed()
        .setColor("#FFFFFE")
        .setTitle("About")
        .setURL("https://microwavebot.tech/discord")
        .addFields(
            { name: "Version", value: "3.0.0 Pre-release", inline: true },
            { name: "Discord Library", value: "Discord.js v13", inline: true },
            { name: "Node.js", value: "v16.16.0", inline: true },
            { name: "Dev Team", value: "\u200B" },
            { name: "Ayden", value: "Founder and Lead bot developer", inline: true },
            { name: "Fonta22", value: "Assistant lead bot developer", inline: true },
            { name: "Ally", value: "Bot developer", inline: true },
            { name: "Sopy", value: "Bot developer", inline: true },
            { name: "Yapudjus", value: "Bot developer", inline: true },
        )
        .setTimestamp()
    await interaction.reply({ embeds: [embed] });
}

module.exports.run = async (client, message) => {
    const embed = new MessageEmbed()
    .setColor("#FFFFFE")
    .setTitle("About")
    .setURL("https://microwavebot.tech/discord")
    .addFields(
        { name: "Version", value: "3.0.0 Pre-Release", inline: true },
        { name: "Discord Library", value: "Discord.js v13", inline: true },
        { name: "Node.js", value: "v16.16.0", inline: true },
        { name: "Dev Team", value: "\u200B" },
        { name: "Ayden", value: "Founder and Lead bot developer", inline: true },
        { name: "Fonta22", value: "Assistant lead bot developer", inline: true },
        { name: "Ally", value: "Bot developer", inline: true },
        { name: "Sopy", value: "Bot developer", inline: true },
        { name: "Yapudjus", value: "Bot developer", inline: true },
    )
    .setTimestamp()

    message.channel.send({ embeds: [embed] });
}