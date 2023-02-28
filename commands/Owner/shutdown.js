const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports.help = {
    name: "shutdown",
    cat: "Owner",
    description: "Shuts down the bot",
    aliases: "",
    data: new SlashCommandBuilder().setName("shutdown").setDescription("Shuts down the bot").addStringOption( option => {
        return option
        .setName("confirm")
        .setDescription("Confirm the shutdown")
        .setRequired(true)
        .addChoices({name: "Yes", value: "Yes"}, {name: "No", value: "No"})
    })};

module.exports.interaction = async (interaction, client) => {
    const confirm = interaction.options.getString("confirm");
    if (confirm === "Yes" && interaction.user.id == config.ownerID) {
        const embed = new MessageEmbed()
        .setTitle("Shutdown")
        .setDescription("Shutting down...")
        .setColor("#0099ff")
        .setTimestamp()
        interaction.reply({ embeds: [embed] });
        client.destroy();
    } else {
        interaction.reply({ content: "Shutdown cancelled", ephemeral: true });
    }
}; // Heavily untested!!!