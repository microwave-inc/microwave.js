const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { Permissions } = require("discord.js");

module.exports.help = {
    name: "purge",
    cat: "Mod",
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
        await interaction.channel.bulkDelete(number);
        return interaction.reply({ content: `Successfully purged ${number} messages` });
    }
    else {
        interaction.reply({ content: "You need `MANAGE_MESSAGES` permisions to run this command", ephemeral: true });
    }
}

module.exports.run = async (client, message, args) => {
    if (message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
        var number = args[0];
        if (!number) {
            message.channel.send("Please specify a number of messages to purge");
            return;
        }
        if (!message.guild) {
            message.channel.send("This command can only be used in a server.");
            return;
        }
        if (number > 100) {
            message.channel.send("You can only purge up to 100 messages at once.");
            return;
        }
        if (number < 1) {
            message.channel.send("You can only purge at least 1 message.");
            return;
        } 
        await message.channel.bulkDelete(number);
        message.channel.send(`Successfully purged ${number} messages`);
    } else {
        message.channel.send("You need `MANAGE_MESSAGES` permisions to run this command")
    }
}