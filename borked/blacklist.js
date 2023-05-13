const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blacklist')
        .setDescription('Blacklist a user from using the bot.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Add a user to the blacklist.')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('The user to blacklist.')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Remove a user from the blacklist.')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('The user to remove from the blacklist.')
                        .setRequired(true))),

};

module.exports.interaction = async (interaction, client) => {
    const user = interaction.options.getUser('user');
    const apiurl = "127.0.0.1/api/v1/blacklist"; // Private API URL
    const apikey = config.apikey;
    const subcommand = interaction.options.getSubcommand();
    const member = interaction.member;
    const config = require('../config.json');

    if (config.includes(member.id)) {
        if (subcommand === 'add') {
            const add = await fetch(apiurl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': apikey,
                },
                body: JSON.stringify({
                    user: user.id,
                }),
            });
            const addjson = await add.json();
            if (addjson.success === true) {
                interaction.reply(`Successfully added ${user.tag} to the blacklist.`);
            } else {
                interaction.reply(`Failed to add ${user.tag} to the blacklist.`);
            }
        }
        if (subcommand === 'remove') {
            await interaction.reply({ content: `Still being worked on` })
        }
    } else {
        interaction.reply(`You do not have permission to use this command.`);
    }

};
