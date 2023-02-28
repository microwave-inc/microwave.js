const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports.help = {
    name: "eval",
    cat: "Owner",
    description: "Evaluates code",
    aliases: "",
    data: new SlashCommandBuilder().setName("eval").setDescription("Evaluates code").addStringOption( option => {
        return option
        .setName("code")
        .setDescription("Code to evaluate")
        .setRequired(true)
    })};

module.exports.interaction = async (interaction, client) => {
if (interaction.user.id !== config.ownerID) return interaction.reply({ content: "You are not a wizard harry!", ephemeral: true }); // Need to get the login info of one of my alts for this
if (interaction.options.getString("code") === "") return interaction.reply({ content: "You need to provide code to evaluate!", ephemeral: true });
code = interaction.options.getString("code");
    start = (Date.now()),
    evalresponse = eval(code),
    time = Date.now() - start;

message.channel.send(`**Evaluated:**\n\`\`\`js\n${stringtoeval}\`\`\`**Response:**\n\`\`\`js\n${evalresponse}\`\`\`In ${time}ms.`)
};