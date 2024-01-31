const { SlashCommandBuilder } = require("@discordjs/builders");
// Note: This is an old command from the python bot, I just converted it to a slash command and to JS
module.exports.help = {
    name: "hot",
    cat: "Fun",
    description: "A random hotness calculator",
    aliases: "",
    cmdid: "1080020862205427724",
    data: new SlashCommandBuilder().setName("hot").setDescription("A random hotness calculator").addUserOption(option => option.setName("user").setDescription("The user to calculate hotness for").setRequired(true)),
}

module.exports.interaction = async (interaction, client) => {
    const user = interaction.options.getUser("user");

    const hotness = Math.floor(Math.random() * 100) + 1;

    function getEmoji() { // Yes I had to make this a function
        if (hotness > 25) {
            let emoji = "❤"
        return emoji;
        } else if (hotness > 50) {
            let emoji = "💖"
        return emoji;
        } else if (hotness > 75) {
            let emoji = "💞"
        return emoji;
        } else if (hotness < 25) {
            let emoji = "💔"
        return emoji; // God I am just now remembering how long it took me to make this function
    }
    };
    
    if (user.id == interaction.user.id) { // Checks if the user is the author
        interaction.reply({ content: `you are ${hotness}% hot ` + getEmoji() });
    } else {
        interaction.reply({ content: user.username + ` is ${hotness}% hot ` + getEmoji() }); // And yes I am lazy
    };
}