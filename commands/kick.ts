const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require('discord.js');

module.exports.help = {
    name: "kick",
    cat: "Mod",
    description: "Kicks a mentioned user",
    aliases: "",
    data: new SlashCommandBuilder().setName("kick").setDescription("Kicks a mentioned user"),
};

//If interaction command
module.exports.interaction = async (interaction, client) => {
    //Not doing this - Ally
};

//If normal command
module.exports.run = async (client, message, args) => {
    if (message.author.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) { //This isn't an error, just ts being very gay.
        var userID;

        if (/<@(\d+)>/g.test(args[0]) === true) {
            let e = /<@(\d+)>/g.exec(args[0]);

            userID = t[1]; //This won't be null, trust me - Ally
        } else {
            userID = args[0];
        }

        var i = client.users.cache.find((i1) => i == userID);

        if (i === undefined) {
            //Call for help
            message.channel.send("The user referenced is invaild");
        }

        message.guild.members.kick(userID)
            .then(i => {
                message.channel.send(`:white_check_mark: ${i.user.username} was kicked from ${message.guild.name}`);
            })
    }
};
