const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports.help = {
    name: "infuriation",
    cat: "Fun",
    description: "Get a random photo with garanteed infuriation",
    aliases: "",
    data: new SlashCommandBuilder().setName("infuriation").setDescription("Get a random photo with garanteed infuriation"),
};

module.exports.interaction = async (interaction, client) => {
    const subReddits = ["mildlyinfuriating", "extremelyinfuriating", "diwhy"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];

    const img = await randomPuppy(random);
    const embed = new MessageEmbed()
        .setColor("#FFFFFE")
        .setImage(img)
        .setTitle(`From /r/${random}`)
        .setURL(`https://reddit.com/r/${random}`)
        .setFooter('This does have a chance to not work');
    await interaction.reply({ embeds: [embed] });
};

module.exports.run = async (client, message) => {
    const subReddits = ["mildlyinfuriating", "extremelyinfuriating", "diwhy"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];

    const img = await randomPuppy(random);
    const embed = new MessageEmbed()
        .setColor("#FFFFFE")
        .setImage(img)
        .setTitle(`From /r/${random}`)
        .setURL(`https://reddit.com/r/${random}`);
    message.channel.send({ embeds: [embed] });
};