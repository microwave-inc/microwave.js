const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { ownerID } = require("../../config.json");
module.exports.help = {
    name: "eval",
    cat: "Owner",
    description: "Evaluate code",
    data: new SlashCommandBuilder().setName("eval").setDescription("Evaluate code").addStringOption(option => option.setName("code").setDescription("Code to evaluate").setRequired(true))
};

async function clean(client, text) {
    const token = require("../../config.json").token; // Get the token so we can check for it
    if (text && text.constructor.name == "Promise") text = await text; // If it's a promise, await it
    if (typeof evaled !== "string") text = require("util").inspect(text, { depth: 0 }); // If the result is an object, make it a string
    if (text.includes(token)) text = text.replace(token, "T0K3N"); // Remove the token and replace it with "T0K3N"
    return text; // Return the output
}

module.exports.interaction = async (interaction, client) => {
    const code = interaction.options.getString("code"); // Get the code they wanna evaluate
    if (interaction.user.id !== ownerID) return interaction.reply({ content: "You are not the bot owner", ephemeral: true }); // Check if user is a dev
    const embed = new MessageEmbed() // initialize embed
        .setColor("RANDOM") // Set a random color
        .setTimestamp() // Set the timestamp to now
    try { // Try to evaluate the code
        let evaled = eval(code); // Evaluate the code
        if (evaled instanceof Promise) evaled = await evaled; // If it's a promise, await it
        if (typeof evaled !== "string") evaled = require("util").inspect(evaled, { depth: 0 }); // If the result is an object, make it a string
        embed.setTitle("Evaluated");
        embed.setDescription(`\`\`\`js\n${await clean(client, evaled)}\n\`\`\``);
    } catch (err) { // If there's an error
        embed.setTitle("Error");
        embed.setDescription(`There was an error while evaluating the code.`);
    };

    interaction.reply({ embeds: [embed] }); // Reply with the embed
};
