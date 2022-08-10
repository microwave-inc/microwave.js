const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require('discord.js');

module.exports.help = {
    name: "ban",
    cat: "Moderation",
    description: "Bans a mentioned user",
    aliases: "",
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
            await interaction.guild.members.ban(user.id).catch(err => {console.log(err)})
            return interaction.reply({ content: `Successfully banned ${user.tag}` });
        }
    else {
        interaction.reply({ content: "You need `BAN_MEMBERS` permisions to run this command", ephemeral: true });
    }
};

//If normal command
module.exports.run = async (client, message, args) => {
    if (message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
        var userID;

        if (/<@(\d+)>/g.test(args[0]) === true) {
            let t = /<@(\d+)>/g.exec(args[0]);

            userID = t[1]; //This won't be null, trust me - Ally
        } else {
            userID = args[0];
        }

        var i = client.users.cache.find((i1) => i1 == userID);

        if (i === undefined) {
            //Call for help
            message.channel.send("The user referenced is invaild");
            return;
        }

        message.guild.members.ban(userID).catch(err => {console.log(err)})
            .then(j => {
                message.channel.send(`:white_check_mark: User was banned from ${message.guild.name}`);
            });
    }
};
