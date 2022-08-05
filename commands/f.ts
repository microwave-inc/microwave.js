const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports.help = {
    name: "f",
    cat: "Fun",
    description: "F",
    aliases: "",
    SlashCommandBuilder: new SlashCommandBuilder().setName("f").setDescription("F"),
}

module.exports.interaction = async (interaction, client) => {
    interaction.reply({ content: "F" });
}

module.exports.run = async (client, message, args) => {
    message.channel.send("F");
}