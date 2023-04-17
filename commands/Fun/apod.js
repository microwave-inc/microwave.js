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
    const api = `https://api.nasa.gov/planetary/apod?api_key=${apikey}`; // Set the API URL so shit stops complaining

    // Date options
    let year = interaction.options.getInteger("Year");
    let month = interaction.options.getInteger("Month");
    let day = interaction.options.getInteger("Day");

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



    fetch(api)
    .then(response => response.json()) // Get the json
    .then(data => { // Set all the vars from the JSON file
        const image = data.hdurl;
        const title = data.title;
        const date = data.date;
        // console.log(`Date: ${date}\nTitle: ${title}\nImage: ${image}`)

        const embed = new MessageEmbed()
        if (title) {
            embed.setTitle(`${title}`)
        }
        if (date) {
        embed.setDescription(`date: ${date}`)
        }
        embed.setImage(image)

        interaction.reply({embeds: [embed]}); // Hopefully this sends the embed
    }).catch( err => {
        interaction.reply("An error occured, please try again later.")
        console.log(err)
    })
};

//If normal command
module.exports.run = async (client, message, args) => {
    await message.channels.send("Hello! We have moved fully away from prefixed commands, please use the slash commands instead!")
};
