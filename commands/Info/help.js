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

function searchCommands(path, helpEmbed) {
  const commandFiles = fs.readdirSync(path);
  for (const file of commandFiles) {
    const commandPath = `${path}/${file}`;
    const stat = fs.lstatSync(commandPath);
    if (stat.isDirectory()) {
      searchCommands(commandPath, helpEmbed);
    } else {
      if (file.endsWith(".js")) {
        const command = require(`../../${commandPath}`);
        const commandHelp = command.help;
        if (commandHelp) {
          if (commandHelp.owneronly) {
            // Skip that command
          } else {
            if ( commandHelp.cmdid && commandHelp.cmdid != "" || commandHelp.cmdid != null) {
              helpEmbed.addFields({
                name: `</${commandHelp.name}:${commandHelp.cmdid}>`,
                value: `${commandHelp.description}`
              });
            }
            else {
              helpEmbed.addFields({
                name: `/${commandHelp.name}`,
                value: `${commandHelp.description}`,
              });
            }
          }
        }
      }
    }
  }
}

// If interaction command
module.exports.interaction = async (interaction, client, onlineSelector, idLogger, pollManager) => {
  const helpEmbed = new MessageEmbed().setTitle("All commands").setColor("FFFFFF");
  searchCommands("./commands", helpEmbed);
  interaction.reply({ embeds: [helpEmbed], ephemeral: true });
};

// If normal command
module.exports.run = async (client, message) => {
  await message.channel.send("Hello! We have moved fully away from prefixed commands, please use the slash commands instead!");
};
