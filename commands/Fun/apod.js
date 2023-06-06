const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, version} = require("discord.js");
const config = require("../../config.json");
const fetch = require("node-fetch");

module.exports.help = {
    name: "apod",
    cat: "Fun",
    description: "Get the Astronomy Picture of the Day",
    aliases: "",
    cmdid: "1080020862205427722",
    data: new SlashCommandBuilder().setName("apod").setDescription("Get the Astronomy Picture of the Day").addIntegerOption(option => {
        return option
            .setName("year")
            .setDescription("The year to get the APOD from")
        }).addIntegerOption(option => {
            return option
                .setName("month")
                .setDescription("The month to get the APOD from")
        }).addIntegerOption(option => {
            return option
                .setName("day")
                .setDescription("The day to get the APOD from")
        })
        };

//If interaction command
module.exports.interaction = async (interaction, client) => {
    const apikey = config.nasa; // Not sure if this works.
    var api = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apikey}`); // Set the API URL so shit stops complaining

    // Date options
    let year = interaction.options.getInteger("Year");
    let month = interaction.options.getInteger("Month");
    let day = interaction.options.getInteger("Day");
/*
    if (year != null) {
        if (month != null) {
            if (day != null) {
                let api = `https://api.nasa.gov/planetary/apod?api_key=${apikey}&date=${year}-${month}-${day}`;

                if (year < 1995) { // Check if the date set is before June 16th 1995 (The first APOD) // Only check if a year month and day has been set
                    if (month < 6) {
                        if (day < 16) {
                            interaction.reply("Sorry, but the APOD API does not support dates before June 16, 1995.");
                        }
                    }
                }
    } else {
        let api = `https://api.nasa.gov/planetary/apod?api_key=${apikey}`
    }
} else {   
    let api = `https://api.nasa.gov/planetary/apod?api_key=${apikey}`;
}
    } else {
        let api = `https://api.nasa.gov/planetary/apod?api_key=${apikey}`;
    } // This is a mess, but it should work..... I need to K.I.S.S. (Keep It Simple Stupid)
*/

    if (year != null || month != null || day != null) {
        if (year < 1995 && month < 6 && day < 16) {
            interaction.reply("Sorry, but the APOD API does not support dates before June 16, 1995.");
        }
        else {
            let api = `https://api.nasa.gov/planetary/apod?api_key=${apikey}&date=${year}-${month}-${day}`;
        }
    } // I did infact K.I.S.S. (Keep It Simple Stupid) this time, much better code.
    if (api.status != 200) {
        interaction.reply({ content: `The server returned something other than a 200, it returned a ${api.status}, try again later`, ephemeral: true });
    }

    const data = api.json();

    const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Astronomy Picture of the Day")
        .addFields(
            { name: "Title", value: data.title, inline: true },
            { name: "Date", value: data.date, inline: true }
        )
        if (data.media_type === "video") { // Check if they are using an image or video and set it accordingly.
            embed.video(data.url)
        } else {
            embed.setImage(data.url)
        }

};

//If normal command
module.exports.run = async (client, message, args) => {
    await message.channels.send("Hello! We have moved fully away from prefixed commands, please use the slash commands instead!")
};
