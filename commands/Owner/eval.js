const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const util = require("util");

module.exports.help = {
  name: "eval",
  cat: "Owner",
  description: "Evaluates code",
  aliases: "",
  data: new SlashCommandBuilder()
    .setName("eval")
    .setDescription("Evaluates code")
    .addStringOption((option) => {
      return option
        .setName("code")
        .setDescription("Code to evaluate")
        .setRequired(true);
    }),
};

module.exports.interaction = async (interaction, client) => {
  function ownercheck() {
    if (config.ownerID.includes(interaction.user.id)) {
      return true;
    } else {
      return false;
    }
  }

  if (ownercheck() != false) {
    // If not false then ...
    if (interaction.options.getString("code") === "") {
      return interaction.reply({
        content: "You need to provide code to evaluate!",
        ephemeral: true,
      });
    } else {
      let code = interaction.options.getString("code");
      if (code == 'const config = require("../../config.json");') {
        return interaction.reply({
          content: "You are not a wizard harry!",
          ephemeral: true,
        });
      }

      const logs = []; // Create an array to store console logs
      const log = console.log; // Store the original console.log() function
      console.log = (...args) => {
        logs.push(util.format(...args)); // Push formatted logs to the array
        log(...args); // Call the original console.log() function
      };

      const start = Date.now();
      let evalresponse = eval(code);
      const time = Date.now() - start;

      // Convert the object to a string using util.inspect()
      evalresponse = util.inspect(evalresponse, { depth: 0 });

      // Send the logs as a message in Discord
      const logsMessage = logs.join("\n");
      await interaction.reply({
        content: `**Console Logs:**\n\`\`\`${logsMessage}\`\`\``,
        ephemeral: true,
      });
      console.log = log; // Restore the original console.log() function

      return;
    }
  } else {
    return interaction.reply({
      content: "You are not a wizard harry!",
      ephemeral: true,
    });
  }
};
