const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, version} = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
const ms = require("ms")



module.exports.help = {
    name: "about", 
    cat: "Info",
    description: "Get information about the bot",
    aliases: "",
    cmdid: "1080020862205427726",
    data: new SlashCommandBuilder().setName("about").setDescription("Get information about the bot"),
}

module.exports.interaction = async (interaction, client) => {

    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
        const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]")

        const embed = new MessageEmbed()
            .setColor("#FFFFFE")
            .setTitle("About")
            .setURL("https://microwavebot.com")
            .setTitle("**Stats:**")
            .setColor("#9603fd")
            .addFields(
                { name: "⌚️ Uptime", value: `${duration}`, inline: true },
                { name: "⏳ API Latency", value: `${(client.ws.ping)}ms`, inline: true },
                { name: "📝 Mem Usage", value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, inline: true },
                { name: "🤖 Node", value: `${process.version}`, inline: true },
                { name: "👾 Discord.js", value: `v${version}`, inline: true },
                { name: "🤖 Microwave bot version", value: `3.3.7a Sungsam`, inline: true },
                { name: "📁 Servers", value: `${client.guilds.cache.size}`, inline: true },
                { name: "CPU", value: `\`${os.cpus().map(i => `${i.model}`)[0]}\`` },
                { name: "CPU usage", value: `\`${percent.toFixed(2)}%\``, inline: true },
                { name: "Arch", value: `\`${os.arch()}\``, inline: true },
                { name: "Platform", value: `\`\`${os.platform()}\`\``, inline: true },
                { name: "👥 Users", value: `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`, inline: true },
                { name: ":link: Invite", value: "[Invite me](https://discord.com/api/oauth2/authorize?client_id=867964961417203743&permissions=8&scope=bot%20applications.commands)", inline: true }
            )
            .setTimestamp();
        interaction.reply({ embeds: [embed] });
    });
}