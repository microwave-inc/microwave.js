const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require('discord.js');

module.exports.help = {
    name: "unban",
    cat: "Mod",
    description: "Unbans a mentioned user",
    aliases: "",
    data: new SlashCommandBuilder().setName("unban").setDescription("Unbans a mentioned user"),
};

//If interaction command
module.exports.interaction = async (interaction, client) => {
    //Not doing this - Ally
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

        message.guild.members.unban(userID)
            .then(j => {
                message.channel.send(`:white_check_mark: User was unbanned from ${message.guild.name}`);
            });
    } else {
        message.channel.send("You need `BAN_MEMBERS` permisions to run this command")
    }
};
