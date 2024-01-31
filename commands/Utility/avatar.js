const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports.help = {
    name: "avatar",
    cat: "Utility",
    description: "Get the avatar of you or someone else",
    aliases: "",
    cmdid: "1080020862335455323",
    data: new SlashCommandBuilder().setName("avatar").setDescription("Get the avatar of you or someone else").addUserOption(option => {
        return option
            .setName("user")
            .setDescription("The user to get the avatar of")
            .setRequired(true)
    })
};

//If interaction command
module.exports.interaction = async (interaction, client) => {
    //Ez fix for ya -Ayden
    let userID = interaction.options.getUser("user");
    const embed = new MessageEmbed().setColor("#26a6d9");

    embed
        .setTitle(userID.username + "'s Avatar")
        .setImage(userID.displayAvatarURL({ format: "jpg", size: 4096 }));
    interaction.reply({  embeds: [embed] });
};
