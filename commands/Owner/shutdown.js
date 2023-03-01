const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
//const { xp } = require("../../handlers/xp-system.js");

module.exports.help = {
    name: "shutdown",
    cat: "Owner",
    description: "Shuts down the bot",
    aliases: "",
    data: new SlashCommandBuilder().setName("shutdown").setDescription("Shuts down the bot").addStringOption(option => {
        return option
            .setName("confirm")
            .setDescription("Confirm the shutdown")
            .setRequired(true)
            .addChoices({ name: "Yes", value: "Yes" }, { name: "No", value: "No" })
    })
};

module.exports.interaction = async (interaction, client) => {
    const confirm = interaction.options.getString("confirm");
    if (confirm === "Yes") {
        if (interaction.user.id == config.ownerID) { // Need to fix this check
            const embed = new MessageEmbed()
                .setTitle("Shutdown")
                .setDescription("Shutting down...")
                .setColor("#0099ff")
                .setTimestamp()
            interaction.reply({ embeds: [embed] });
            //xp.connectionclose();
            client.destroy();
        }
        else {
            interaction.reply({ content: "You are not a wizard harry!", ephemeral: true });
        }
    } else {
        interaction.reply({ content: "Shutdown cancelled", ephemeral: true });
    }
}; // Heavily untested!!!