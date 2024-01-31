const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");

module.exports.help = {
  name: "kick",
  cat: "Moderation",
  description: "Kicks a mentioned user",
  aliases: "",
  cmdid: "1080020862205427729",
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks a mentioned user")
    .addUserOption((option) => {
      return option
        .setName("user")
        .setDescription("The user to kick")
        .setRequired(true);
    }),
};

//If interaction command
module.exports.interaction = async (interaction, client) => {
  //Ez fix for ya -Ayden
  //Tada, did it for you -Ayden
  if (!interaction.guild) {
    return interaction.reply({
      content: "This command can only be used in a server.",
      ephemeral: true,
    });
  }
  if (interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
    const user = interaction.options.getUser("user");
    if (!user) {
      return interaction.reply({
        content: "Please mention a user to kick.",
        ephemeral: true,
      });
    }
    if (user === interaction.member) {
      return interaction.reply({
        content: "You can't kick yourself.",
        ephemeral: true,
      });
    }
    await interaction.guild.members.kick(user.id).catch((err) => {
      console.log(err);
      return;
    });
    return interaction.reply({ content: `Successfully kicked ${user.tag}` });
  } else {
    interaction.reply({
      content: "You need `KICK_MEMBERS` permisions to run this command",
      ephemeral: true,
    });
  }
};
