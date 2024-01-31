const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require('discord.js');

module.exports.help = {
    name: "ban",
    cat: "Moderation",
    description: "Bans a mentioned user",
    aliases: "",
    cmdid: "1080020862205427728",
    data: new SlashCommandBuilder().setName("ban").setDescription("Bans a mentioned user").addUserOption(option => {
        return option
        .setName("user")
        .setDescription("The user to ban")
        .setRequired(true)
    }),
};

//If interaction command
module.exports.interaction = async (interaction, client) => {
    //Ez fix for ya -Ayden
    //Tada, did it for you -Ayden
    if (!interaction.guild) {
        return interaction.reply({ content: "This command can only be used in a server.", ephemeral: true });
    }
        if (interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            const user = interaction.options.getUser("user");
            if (!user) {
                return interaction.reply({ content: "Please mention a user to ban.", ephemeral: true });
            }
            if (user === interaction.member) {
                return interaction.reply({ content: "You can't ban yourself.", ephemeral: true });
            }
            // If already banned
            if (interaction.guild.bans.cache.has(user.id)) {
                return interaction.reply({ content: "This user is already banned.", ephemeral: true });
            }
            await interaction.guild.members.ban(user.id).catch(err => {console.log(err); return})
            return interaction.reply({ content: `Successfully banned ${user.tag}` });
        }
    else {
        interaction.reply({ content: "You need `BAN_MEMBERS` permisions to run this command", ephemeral: true });
    }
};

//If normal command
module.exports.run = async (client, message, args) => {
    await message.channels.send("Hello! We have moved fully away from prefixed commands, please use the slash commands instead!")
};
