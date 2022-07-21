const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports.help = {
    name: "avatar",
    cat: "Discord",
    description: "Get the avatar of you or someone else",
    aliases: "",
    data: new SlashCommandBuilder().setName("avatar").setDescription("Get the avatar of you or someone else"),
};

//If interaction command
module.exports.interaction = async (interaction, client) => {
    //Ez fix for ya -Ayden
    return interaction.reply({ content: "Uh oh, this is currently in testing please use the prefixed command instead", ephemeral: true });
};

//If normal command
module.exports.run = async (client, message, args) => {
    const embed = new MessageEmbed().setColor("#26a6d9");

    if (args.length === 0) {
        embed
            .setTitle(message.author.username + "'s Avatar")
            .setImage(message.author.displayAvatarURL({ format: "jpg", size: 4096 }));
        message.channel.send({ embeds: [embed] });
    } else {
        var userID;

        if (/<@(\d+)>/g.test(args[0]) === true) {
            let e = /<@(\d+)>/g.exec(args[0]);

            userID = e[1];
        } else {
            userID = args[0];
        }

        var i = client.users.cache.find((i1) => i1 == userID);

        if (i === undefined) {
            //call for help
            message.channel.send("The user referenced is invaild");
            return;
        }

        client.users.fetch(userID).then((user) => {
            embed
                .setTitle(user.username + "'s Avatar")
                .setImage(user.displayAvatarURL({ format: "jpg", size: 4096 }));

            message.channel.send({ embeds: [embed] });
        }).catch(console.error);

    }
};
