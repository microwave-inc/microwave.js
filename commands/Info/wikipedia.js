const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed} = require("discord.js");

module.exports.help = {
    name: "wikipedia",
    cat: "Info",
    description: "Search wikipedia",
    aliases: "",
    cmdid: "",
    data: new SlashCommandBuilder()
        .setName("wikipedia")
        .setDescription("Search wikipedia")
        .addStringOption(option => {
            return option
            .setName("search")
            .setDescription("What do you want to search?")
            .setRequired(true)
        })
};

module.exports.interaction = async (interaction, client) => {
    // Defer the command incase the API takes a while to respond
    await interaction.deferReply()

    const query = interaction.options.getString("search")
    const api = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${query}`) // Get the API
    const data = await api.json() // Set a variable for the data


    if (!api.ok) { // First check if the API responds with anything other than 200 (OK)
        // Check if the API responds with 404 (Not found)
        if (api.status === 404) {
            return interaction.editReply({ content: "Could not find that page on Wikipedia", ephemeral: true }) // If so then tell the user
        }
        else {
            return interaction.editReply({ content: "The API did not respond correctly, please try again later", ephemeral: true }) // If so then tell the user
        }
    };

    const embed = new MessageEmbed() // Init the embed
        .setColor('RANDOM')
        .setTitle(data.title)
        .setURL(data.content_urls.desktop.page)
        .setDescription(data.extract)
        //.setThumbnail(data.thumbnail.source)
        .setTimestamp()
        // Check if it is a disambiguation page
        if (data.type === "disambiguation") {
            embed.addFields({ name: "Disambiguation", value: "This is a disambiguation page, meaning there are multiple pages with the same name. \n\n Please search for a more specific term."})
        }

    await interaction.editReply({ embeds: [embed] })
}