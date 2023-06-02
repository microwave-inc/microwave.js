const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports.help = {
    name: "covid",
    cat: "Info",
    description: "Get information about covid",
    aliases: "",
    cmdid: "",
    data: new SlashCommandBuilder()
        .setName("covid")
        .setDescription("Get information about covid")
        .addStringOption(option =>
            option.setName("country")
                .setDescription("The country you want to get information about")
                .setRequired(true)
        )
};

module.exports.interaction = async (interaction, client) => {
    const country = interaction.options.getString("country");
    const api = await fetch(`https://disease.sh/v3/covid-19/countries/${country}`)

    // Check if country is in json file
    if (!api.status === 200) {
        interaction.reply({ content: "This country is not in the list", ephemeral: true });
    } else if (api.status === 500) {
        interaction.reply({ content: "An error occured while fetching the data", ephemeral: true });
    }
    else {
        await getapidata(country, interaction);
    }

    async function getapidata(country, interaction) {
        const api = await fetch(`https://disease.sh/v3/covid-19/countries/${country}`)
        const data = await api.json()

        const flag = data.countryInfo.flag
        const name = data.country
        const cases = data.cases.toLocaleString()
        const deaths = data.deaths.toLocaleString()
        const recovered = data.recovered.toLocaleString()
        const active = data.active.toLocaleString()
        const critical = data.critical.toLocaleString()
        const population = data.population.toLocaleString()
        const continent = data.continent

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Covid-19 stats for ${name}`)
            .setThumbnail(flag)
            .addFields(
                { name: "Cases", value: cases, inline: true },
                { name: "Deaths", value: deaths, inline: true },
                { name: "Recovered", value: recovered, inline: true },
                { name: "Active", value: active, inline: true },
                { name: "Critical", value: critical, inline: true },
                { name: "Population", value: population, inline: true },
                { name: "Continent", value: continent, inline: true },
                { name: "Pop. who had covid and lived", value: percentage(data.recovered, data.population), inline: true },
            )
            .setTimestamp()
            .setFooter({ text: `Requested by ${interaction.member.tag}` })

        // Check if interaction has already been replied or deferred
        if (interaction.deferred || interaction.replied) {
            return;
        }

        await interaction.reply({ embeds: [embed] });
        return;
    }
};

 function percentage(a, b) {
    /**
     * @description Calculates percentage
     * @param {number} a - First number (Smaller)
     * @param {number} b - Second number (Bigger)
     * @returns {string} Percentage
     * @example percentage(1, 2) // 50%
     */
    const result = (a / b) * 100
    const resultformatted = `${result.toFixed(2)}%`
    return resultformatted
}