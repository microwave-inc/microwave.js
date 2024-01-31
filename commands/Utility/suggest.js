const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { MessageActionRow, Modal, TextInputComponent } = require('discord.js');

module.exports.help = {
    name: "suggest",
    cat: "Utility",
    description: "Suggest something to the devs",
    aliases: "",
    cmdid: "1080020862335455325",
    data: new SlashCommandBuilder().setName("suggest").setDescription("Suggest something to the devs")
};

module.exports.interaction = async (interaction, client) => {
    const suggestionschannel = client.channels.cache.get("1002019218407051325")

    const modal = new Modal()
        .setCustomId('suggestionmodal')
        .setTitle('Suggestion')
    const suggestion = new TextInputComponent()
        .setCustomId('suggestion')
        .setLabel('Suggestion')
        .setPlaceholder('Suggestion (DO NOT INCLUDE MORE THAN ONE SUGGESTION)')
        .setMinLength(10)
        .setStyle('PARAGRAPH')
        .setRequired(true)

    const firstactionrow = new MessageActionRow().addComponents(suggestion)
    modal.addComponents(firstactionrow)
    await interaction.showModal(modal);
    const submitted = await interaction.awaitModalSubmit({
        time: 60000,
        filter: i => i.user.id === interaction.user.id,
    }).catch(error => {
        // Catch any Errors that are thrown (e.g. if the awaitModalSubmit times out after 60000 ms)
        console.error(error)
        return null
    });

    if (submitted) {
        // interaction.deferReply({ ephemeral: true }); // Turns out you can't defer a modal reply
        const suggestiontext = submitted.fields.getTextInputValue('suggestion');
        const suggestionembed = new MessageEmbed()
        .setTitle("Suggestion")
        .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ format: "jpg" }) })
        .setDescription(suggestiontext + "\n ID (User): " + interaction.user.id)
        .setColor("#0099ff")
        .setTimestamp()
        await suggestionschannel.send({ embeds: [suggestionembed] });
        await submitted.reply({ content: "Your suggestion has been sent to the devs", ephemeral: true });
    } else {
        await interaction.followUp({ content: "You didn't submit a suggestion in time.", ephemeral: true });
    }
}