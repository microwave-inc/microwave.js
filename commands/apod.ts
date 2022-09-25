const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, version} = require("discord.js");
const config = require("../config.json")
const apikey = config.apikey // The NASA API Key needed to get the image.

module.exports.help = {
    name: "apod",
    cat: "Fun",
    aliases: "spacepic",
    data: new SlashCommandBuilder().setName("apod").setDescription("Get a nice picture of space!").addTextOption(option => {
        return option

    }),
};

// example of what will be used (date is my birthday) -Ayden
// https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2007-04-26