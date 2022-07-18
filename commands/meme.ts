const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports.help = {
    name: "memes",
    cat: "Fun",
    description: "Get a random meme",
    aliases: "redditmeme",
    data: new SlashCommandBuilder().setName("memes").setDescription("Get a random meme"),
};

module.exports.interaction = async (interaction, client) => {
    const subReddits = ["dankmemes", "memes", "me_irl", "comedycemetery"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];

    const img = await randomPuppy(random);
    const embed = new MessageEmbed()
        .setColor("#FFFFFE")
        .setImage(img)
        .setTitle(`From /r/${random}`)
        .setURL(`https://reddit.com/r/${random}`);
    await interaction.reply({ embeds: [embed] });
};

module.exports.run = async (client, message) => {
    const subReddits = ["dankmemes", "memes", "me_irl", "comedycemetery"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];

    const img = await randomPuppy(random);
    const embed = new MessageEmbed()
        .setColor("#FFFFFE")
        .setImage(img)
        .setTitle(`From /r/${random}`)
        .setURL(`https://reddit.com/r/${random}`);
    message.channel.send({ embeds: [embed] });
};