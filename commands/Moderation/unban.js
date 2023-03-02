const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require('discord.js');

module.exports.help = {
    name: "unban",
    cat: "Moderation",
    description: "Unbans a mentioned user",
    aliases: "",
    cmdid: "1080020862335455322",
    data: new SlashCommandBuilder().setName("unban").setDescription("Unbans a mentioned user").addUserOption(option => {
        return option
        .setName("user")
        .setDescription("The user to unban")
        .setRequired(true)
    }),
};

//If interaction command
module.exports.interaction = async (interaction, client) => {
    //Not doing this - Ally
    //Tada, did it for you -Ayden
    if (!interaction.guild) {
        return interaction.reply({ content: "This command can only be used in a server.", ephemeral: true });
    }
        if (interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            const user = interaction.options.getUser("user");
            if (!user) {
                return interaction.reply({ content: "Please mention a user to unban.", ephemeral: true });
            }
            await interaction.guild.members.unban(user.id).catch(err => {console.log(err); return})
            return interaction.reply({ content: `Successfully unbanned ${user.tag}` });
        }
    else {
        interaction.reply({ content: "You need `BAN_MEMBERS` permisions to run this command", ephemeral: true });
    }
};

//If normal command
module.exports.run = async (client, message, args) => {
    await message.channels.send("Hello! We have moved fully away from prefixed commands, please use the slash commands instead!")
};
