const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

function generatePassword(length) {
    let password = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        password += characters.charAt(randomIndex);
    }
    return password;
}

module.exports.help = {
    name: 'passwordgen',
    cat: 'Utility',
    description: 'Generate a random password.',
    aliases: "",
    cmdid: "1108079546399473664",
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