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
        //.setURL("https://microwavebot.tech/discord")
        .setTitle("**Stats:**")
        .setColor("#9603fd")
        .addField("⌚️ Uptime ", `${duration}`, true)
        .addField("⏳ API Latency", `${(client.ws.ping)}ms`,true)  
        .addField("📝 Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
        .addField("🤖 Node", `${process.version}`, true)
        .addField("👾 Discord.js", `v${version}`, true)
        .addField("🤖 Microwave bot version", `3.3.0 Sungsam`, true)
        .addField("📁 Servers", `${client.guilds.cache.size}`, true)
        .addField("CPU", `\`${os.cpus().map(i => `${i.model}`)[0]}\``)
        .addField("CPU usage", `\`${percent.toFixed(2)}%\``, true)
        .addField("Arch", `\`${os.arch()}\``, true)
        .addField("Platform", `\`\`${os.platform()}\`\``, true)
        .setTimestamp()
    interaction.reply({ embeds: [embed] });
});
}

module.exports.run = async (client, message) => {
    await message.channels.send("Hello! We have moved fully away from prefixed commands, please use the slash commands instead!")
}

//this is all yoinked from an old project called DSB - Ayden