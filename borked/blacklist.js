const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blacklist')
        .setDescription('Blacklist a user from using the bot.')
        .addSubCommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Add a user to the blacklist.')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('The user to blacklist.')
                        .setRequired(true)))
        .addSubCommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Remove a user from the blacklist.')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('The user to remove from the blacklist.')
                        .setRequired(true)))
        .addSubCommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('List all blacklisted users.')),
};

module.exports.execute = async (interaction) => {
    const user = interaction.options.getUser('user');
    const subcommand = interaction.options.getSubcommand();
    const blacklistjson = require('../blacklist.json');
    const executer = interaction.user.id;
    const config = require('../../config.json');

    if (config.ownerID.includes(executer)) {
        if (subcommand === 'add') {
            if (blacklistjson.includes(user.id)) {
                const embed = new MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Error')
                    .setDescription('That user is already blacklisted.')
                return interaction.reply({ embeds: [embed] })
            } else {
                blacklistjson.users.push(user.id);
                const embed = new MessageEmbed()
                    .setColor('#00ff00')
                    .setTitle('Success')
                    .setDescription('That user has been blacklisted.')
                return interaction.reply({ embeds: [embed] })
            }
        }
        if (subcommand === 'remove') {
            if (blacklistjson.includes(user.id)) {
                blacklistjson.users.splice(blacklistjson.users.indexOf(user.id), 1);
                const embed = new MessageEmbed()
                    .setColor('#00ff00')
                    .setTitle('Success')
                    .setDescription('That user has been removed from the blacklist.')
                return interaction.reply({ embeds: [embed] })
            } else {
                const embed = new MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Error')
                    .setDescription('That user is not blacklisted.')
                return interaction.reply({ embeds: [embed] })
            }
        }
        if (subcommand === 'list') {
            const embed = new MessageEmbed()
                .setColor('#00ff00')
                .setTitle('Blacklisted Users')
                blacklistjson.user.forEach(users => {
                    embed.addFields(
                        { name: 'User ID', value: users, inline: true }
                    )
                });
            return interaction.reply({ embeds: [embed] })
        }
    }
}

// IDK should fucking work