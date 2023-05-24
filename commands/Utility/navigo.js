const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
const { MessageSelectMenu } = require('discord.js');

module.exports.help = {
    name: "navigo",
    aliases: ["nav"],
    description: "Navigo subcommands",
    cmdid: "",
    data: new SlashCommandBuilder()
        .setName("navigo")
        .setDescription("Navigo subcommands")
        .addSubcommand(subcommand => {
            return subcommand
                .setName("users")
                .setDescription("Lists info on a specific user.")
                .addIntegerOption(option => {
                    return option
                        .setName("id")
                        .setDescription("The user ID to get the user from.")
                        .setRequired(true)
                })
        })
        .addSubcommand(subcommand => {
            return subcommand
                .setName("roadmaps")
                .setDescription("Lists data on a specific roadmap.")
                .addIntegerOption(option => {
                    return option
                        .setName("id")
                        .setDescription("The roadmap ID to get the roadmap from.")
                        .setRequired(true)
                })
        })
};

module.exports.interaction = async (interaction, client) => {
    const subcommand = interaction.options.getSubcommand();
    const id = interaction.options.getInteger("id");
    const apistatus = await fetch (`https://navigolearn.com/api/users/${id}`)
    if (subcommand === "users") {
        if (id) {
            if (!apistatus.ok) { // Basically checks if user exists (0 or 100 will return a bad request)
                const embed = new MessageEmbed()
                    .setTitle("Error")
                    .setDescription("That user doesn't exist.")
                    .setColor("RED")
                interaction.reply({ embeds: [embed], ephemeral: true })
            }
            const api = await fetch(`https://navigolearn.com/api/users/${id}`)
            const data = await api.json();
            //console.log(data.followerCount, data.followingCount, data.roadmapsCount, data.blogUrl, data.githubLink, data.githubUrl)

            const embed = new MessageEmbed()
                .setTitle(`${data.name}`)
                .setThumbnail(data.profilePictureUrl)
                .setTimestamp()
                .setURL(`https://navigolearn.com/users/${id}`)
                //.setDescription(`${data.bio}\n\"${data.quote}\"`) // Not included due to it possibly being null and it would make the code a mess
                .addFields(
                    { name: "Followers:", value: data.followerCount },
                    { name: "Following:", value: data.followingCount },
                    { name: "Roadmaps:", value: data.roadmapsCount },
                //    { name: "Website:", value: data.blogUrl },
                )
            if (data.blogUrl) {
                embed.addFields({ name: "Website:", value: data.blogUrl })
            }
            if (data.githubLink == true) {
                embed.addFields({ name: "Github:", value: data.githubUrl})
            }

            interaction.reply({ embeds: [embed], ephemeral: false })
        };
    };
    if (subcommand === "roadmaps") {
        if (id) {
            const api = await fetch(`https://navigolearn.com/api/roadmaps/${id}`)
            const data = await api.json();

            const embed = new MessageEmbed()
                .setTitle(`${data.name}`)
                .setURL(`https://navigolearn.com/roadmaps/${id}`)
                .setDescription(`${data.description}`)
                .addFields(
                    { name: "Created at:", value: `${isotodiscord(data.createdAt)}` },
                    { name: "Updated last at:", value: `${isotodiscord(data.updatedAt)}` },
                    { name: "Issue count:", value: data.issueCount },
                    { name: "Number of likes:", value: data.likes },
                )

            interaction.reply({ embeds: [embed], ephemeral: false })
        }
    }

};

function isotodiscord(input) {
    /**
     * Converts ISO 8601 timestamp to Discord compatible timestamp
     * 
     * @param {string} input - ISO 8601 timestamp
     * @returns {string} Discord compatible timestamp
     */
    
    var myDate = new Date(input);
    var unixTime = myDate.getTime() / 1000;
    var discordTime = "<t:" + Math.floor(unixTime) + ":R>";
    
    return discordTime;
  }
  
  