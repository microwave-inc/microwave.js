function loadCommands(client) {
  const fs = require("fs");
  const ascii = require("ascii-table");
  const table = new ascii().setHeading("Commands", "Load Status");

  const commandFolders = fs.readdirSync("./Commands");
  for (const folder of commandFolders) {
    const commandFiles = fs
      .readdirSync(`./Commands/${folder}`)
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(`../Commands/${folder}/${file}`);
      if (command.name) {
        client.commands.set(command.name, command);
        table.addRow(file, "✔️");
      } else {
        table.addRow(
          file,
          "❌ => Missing a help.name or help.name is not in string"
        );
        continue;
      }
      if (command.aliases && Array.isArray(command))
        command.aliases.forEach((alias) =>
          client.aliases.set(alias, command.name)
        );
    }
    console.log(table.toString());
  }
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  let commandFile = client.commands.get(interaction.commandName);

  if (commandFile) commandFile.interaction(interaction, client);
});

module.exports = {
  loadCommands,
}; // This is all stolen from https://github.com/Simpleboy353/REAPER-2.0/blob/master/handler/loadCommands.js I couldn't figure it out