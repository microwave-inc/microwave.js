const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports.help = {
    name: "suggest",
    cat: "Utility",
    description: "Suggest something to the devs",
    aliases: "",
    cmdid: "1080020862335455325",
    data: new SlashCommandBuilder().setName("suggest").setDescription("Suggest something to the devs").addStringOption( option => {
        return option
        .setName("suggestion")
        .setDescription("The suggestion")
        .setRequired(true);
    }).addStringOption( option => {
        return option
        .setName("type")
        .setDescription("The type of suggestion")
        .setRequired(true)
        .addChoices({name: "Bot", value: "Bot"}, {name: "Website", value: "Website"}, {name: "Other", value: "Other"})
    })
};

module.exports.interaction = async (interaction, client) => {
    const suggestion = interaction.options.getString("suggestion");
    const type = interaction.options.getString("type");
    const embed = new MessageEmbed()
    .setTitle("Suggestion")
    .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ format: "jpg"})})
    //.setThumbnail(interaction.user.displayAvatarURL({ format: "jpg"})) // Was changed out for .setAuthor
    .setDescription(suggestion + "\nFor: " + type +"\n ID (User): " + interaction.user.id)
    .setColor("#0099ff")
    .setTimestamp()
    //.setfooter({ text: `Suggested by ${interaction.user.username}` });
    client.channels.cache.get("1002019218407051325").send({ embeds: [embed] });
    interaction.reply({ content: "Your suggestion has been sent to the devs", ephemeral: true });
}

module.exports.run = async (message, client) => {
    await message.channels.send("Hello there, as of now we are keeping this command a slash only commmand, we may allow the prefixed command soon... \n to keep up with the updates please join the support server!")
}
