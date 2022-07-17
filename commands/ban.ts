const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require('discord.js');

module.exports.help = {
    name: "ban",
    cat: "Mod",
    description: "Bans a mentioned user",
    aliases: "",
    data: new SlashCommandBuilder().setName("ban").setDescription("Bans a mentioned user"),
};

//If interaction command
module.exports.interaction = async (interaction, client) => {
    //Ez fix for ya -Ayden
    return interaction.reply({ content: "Uh oh, this is currently in testing please use the prefixed command instead", ephemeral: true });
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

        message.guild.members.ban(userID)
            .then(j => {
                message.channel.send(`:white_check_mark: User was banned from ${message.guild.name}`);
            });
    }
};
