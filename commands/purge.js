const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { Permissions } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

module.exports.help = {
    name: "purge",
    cat: "Moderation",
    description: "Purge a number of messages",
    aliases: "",
    data: new SlashCommandBuilder().setName("purge").setDescription("Purge a number of messages").addNumberOption( option => {
        return option
            .setName("number")
            .setDescription("The number of messages to purge")
            .setRequired(true)
    }),

};

module.exports.interaction = async (interaction, client) => {
    const number = interaction.options.getNumber("number")

    if (!interaction.guild) {
        return interaction.reply({ content: "This command can only be used in a server.", ephemeral: true });
    }
    if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
        if (number > 100) {
            return interaction.reply({ content: "You can only purge up to 100 messages at once.", ephemeral: true });
        }
        if (number < 1) {
            return interaction.reply({ content: "You can only purge at least 1 message.", ephemeral: true });
        }
        await interaction.channel.bulkDelete(number).catch(err => {console.log(err); return})
        await interaction.reply({ content: `Successfully purged ${number} messages` });
        await wait(5000);
        await interaction.deleteReply();
    }
    else {
        interaction.reply({ content: "You need `MANAGE_MESSAGES` permisions to run this command", ephemeral: true });
    }
}

module.exports.run = async (client, message, args) => {
    await message.channels.send("Hello! We have moved fully away from prefixed commands, please use the slash commands instead!")
}