const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require('discord.js');
const { MessageEmbed } = require('discord.js'); // you forgot something -Ayden

module.exports.help = {
    name: "mute",
    cat: "Moderation",
    description: "Mutes a mentioned user",
    aliases: "",
    data: new SlashCommandBuilder().setName("mute").setDescription("Mutes a mentioned user"),
};

//If interaction command
module.exports.interaction = async (interaction, client) => {
    //Not doing this - Ally
    //No need, this is real lazy hours - Ayden
    return interaction.reply({ content: "Uh oh, this has not been implemented yet.", ephemeral: true });
};

//If normal command
module.exports.run = async (client, message, args) => {
    /*if (message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS) || message.member.permisions.has(Permissions.FLAGS.BAN_MEMBERS)) {
        var userID;

        if (args[0] !== "createrole") {

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

            message.guild.roles.fetch()
                .then(roles => {
                    var mutedRole = roles.find(role => role.name.toLowerCase() === "muted");
                    if (mutedRole === undefined) {
                        var errorEmbed = new MessageEmbed()
                            .setColor("#B00020")
                            .setTitle("Muted role wasn't found! Create it with m!mute createrole."); //FIxed for ya -Ayden

                        message.channel.send({ embeds: [errorEmbed] });
                    }
                });

        } else {



        }
    } else {
        message.channel.send("You cannot run this command!")
    }*/

    await message.channel.send("Uh oh, this has been disabled due to an an issue with the bot owner's 2FA setting.");
};
