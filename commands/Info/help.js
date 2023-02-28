const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");
const { MessageEmbed } = require("discord.js");

module.exports.help = {
  name: "help",
  cat: "Info",
  description: "Help command",
  aliases: "",
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Help command"),
};

//thank you ally for the help command base, did a bit of fixing tho -Ayden
//If interaction command
module.exports.interaction = async (interaction, client, onlineSelector, idLogger, pollManager) => {
  var aEmbed = new MessageEmbed().setTitle("All commands").setColor("FFFFFF"); // Discord needs to allow us to use pure white whithin discord.js fr

  fs.readdir("commands/", async (err, files) => {
    if (err) throw err;

    var fileName = files.filter((file) => fs.lstatSync(`commands/${file}`).isFile() && file.endsWith(".js"));

    // Adding commands to the help command
    await fileName.forEach((file) => {
      let properties = require(`../commands/${file}`);

      if (properties.help.args) {
        let formatedArgs = properties.help.args.split(",").join(" ");
        aEmbed.addFields({
          name: `/${properties.help.name} \`${formatedArgs}\``,
          value: `${properties.help.description}`,
        });
      } else {
        aEmbed.addFields({
          name: `/${properties.help.name}`,
          value: `${properties.help.description}`,
        });
      }
    });

    interaction.reply({ embeds: [aEmbed], ephemeral: true }); //might make this ephemeral -Ayden
  });
};

//If normal command
module.exports.run = async (client, message) => {
  await message.channel.send("Hello! We have moved fully away from prefixed commands, please use the slash commands instead!");
};
