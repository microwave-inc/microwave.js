const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const random = require('random');

async function generatePassword(length) {
    let password = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    for (let i = 0; i < length; i++) {
        password += characters.charAt(random.int(0, characters.length));
    }
    return password;
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('passwordgen')
        .setDescription('Generate a random password.')
        .addIntegerOption(option =>
            option.setName('length')
                .setDescription('The length of the password.')
                .setRequired(true)),
};

module.exports.interaction = async (interaction, client) => {
    const length = interaction.options.getInteger('length');
    const password = await generatePassword(length);
    const embed = new MessageEmbed()
        .setTitle('Password Generated')
        .setDescription(`Here is your password: \`${password}\``)
        .setColor('GREEN');
    interaction.reply({ embeds: [embed], ephemeral: true });
}