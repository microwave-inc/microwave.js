const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports.help = {
    name: "hot",
    cat: "Fun",
    description: "A random hotness calculator",
    aliases: "",
    data: new SlashCommandBuilder().setName("hot").setDescription("A random hotness calculator").addUserOption(option => option.setName("user").setDescription("The user to calculate hotness for").setRequired(true)),
}

module.exports.interaction = async (interaction, client) => {
    const user = interaction.options.getUser("user");
    if (!user) {
        return interaction.reply({ content: "Please mention a user to calculate hotness for.", ephemeral: true });
    }

    const hotness = Math.floor(Math.random() * 100) + 1;
    
    if (hotness > 25) {
        let emoji = "❤"
    } else if (hotness > 50) {
        let emoji = "💖"
    } else if (hotness > 75) {
        let emoji = "💞"
    } else if (hotness < 25) {
        let emoji = "💔"
    }
    
    interaction.reply({ content: `You are ${hotness}% hot ` + emoji });
}