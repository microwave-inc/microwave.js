const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require('discord.js');
const { MessageEmbed } = require('discord.js'); // you forgot something -Ayden

module.exports.help = {
    name: "mute",
    cat: "Moderation",
    description: "Mutes a mentioned user",
    aliases: "",
    data: new SlashCommandBuilder().setName("mute").setDescription("Mutes a mentioned user"),
};

//If interaction command
module.exports.interaction = async (interaction, client) => {
    //Not doing this - Ally
    //No need, this is real lazy hours - Ayden
    return interaction.reply({ content: "Uh oh, this has not been implemented yet.", ephemeral: true });
};

//If normal command
module.exports.run = async (client, message, args) => {
    await message.channels.send("Hello! We have moved fully away from prefixed commands, please use the slash commands instead!")
};
