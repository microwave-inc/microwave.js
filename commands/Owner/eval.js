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

function ownercheck() {
    if (config.ownerID.includes(interaction.user.id)) {
        return true
    }
    else {
        return false
    }
};
if (ownercheck() != false) { // If not false then ...
    if (interaction.options.getString("code") === "") 
    {
        return interaction.reply({ content: "You need to provide code to evaluate!", ephemeral: true });
    }
    else {
    code = interaction.options.getString("code");
        if (code == "const config = require(\"../../config.json\");") {
            return interaction.reply({ content: "You are not a wizard harry!", ephemeral: true });
        }
        start = (Date.now()),
        evalresponse = eval(code),
        time = Date.now() - start;
    
    return interaction.reply(`**Response:**\n\`\`\`js\n${evalresponse}\`\`\`In ${time}ms.`) // Returns undefined for evalresponse
    };
}
else {
    return interaction.reply({ content: "You are not a wizard harry!", ephemeral: true });
}
};

// console.log("test")