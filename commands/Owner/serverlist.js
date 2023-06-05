const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed} = require("discord.js");
const config = require("../../config.json");

module.exports.help = {
    name: "serverlist",
    cat: "Owner",
    description: "Get a list of servers the bot is in",
    aliases: "",
    data:
        new SlashCommandBuilder()
            .setName("serverlist")
            .setDescription("Get a list of servers the bot is in"),
};

module.exports.interaction = async (interaction, client) => {
    if (config.ownerID.includes(interaction.user.id)) {
        const embed = new MessageEmbed()
            .setTitle("Server List")
            .setColor("#9603fd")
            .setTimestamp();

            for (const guild of client.guilds.cache) {
                    embed.addFields(
                        { name: "Name", value: `${guild[1].name}`, inline: false },
                        { name: "ID", value: `${guild[1].id}`, inline: false },
                        //{ name: "Owner", value: `${guild[1].owner.user.tag}`, inline: true }, // Unsure how to do this rip
                    )
            }
        interaction.reply({ embeds: [embed] });


    }
}