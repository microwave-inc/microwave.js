const { readdirSync } = require("fs");

const ascii = require("ascii-table");

var successfulcount;
var failedcount;
var save;

let table = new ascii("Commands");
table.setHeading("Command", "Load status");

console.log("Command loading initializated")

module.exports.load = 
  function(client, command) {
      var start = new Date()
      if (!command) {
      successfulcount = 0;
      failedcount = 0;
      table = new ascii("Commands");
      table.setHeading("Command", "Load status");
      readdirSync("./commands/").forEach(dir => {
          const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
          for (let file of commands) {
              delete require.cache[require.resolve(`../commands/${dir}/${file}`)];
              try {
                require(`../commands/${dir}/${file}`)
              } catch(e) {
                if (e) {
                  table.addRow(file, `error -> ${e}`);
                  failedcount++
                  continue;
                }
              }            
              let pull= require(`../commands/${dir}/${file}`);
                if (pull.name) {
                  client.commands.set(pull.name, pull);
                  table.addRow(file, 'Ready');
                  successfulcount++
                } else {
                  table.addRow(file, `error -> missing a help.name, or help.name is not a string.`);
                  failedcount++
                  continue;
              
              }
      
              if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
          }
      });
      console.log(table.toString());
      console.log(successfulcount + ' command(s) loaded successfully and ' + failedcount + ' command(s) failed to load in ' + (new Date() - start) + 'ms');
      save = '```' + successfulcount + ' command(s) reloaded and ' + failedcount + ' command(s) failed to load in ' + (new Date() - start) + 'ms```'; 

    } else {
      readdirSync("./commands/").forEach(dir => {
          const commands = readdirSync(`./commands/${dir}/`).filter(file => file.match(`${command}.js`));
          for (let file of commands) {
              delete require.cache[require.resolve(`../commands/${dir}/${file}`)];
              try {
                require(`../commands/${dir}/${file}`)
              } catch(e) {
                if (e) {
                  save = `An error occured reloading ${command} \n\`\`\`\n${e}\n\`\`\``
                  console.log(e)
                  continue;
                }
              }            
              let pull = require(`../commands/${dir}/${file}`);
                if (pull.name) {
                  client.commands.set(pull.name, pull);
                  console.log(`${command} was reloaded Successfully in ${new Date() - start}ms.`);
                  save = `\`\`\`${command} was reloaded Successfully in ${new Date() - start}ms.\`\`\`` 
                } else {
                  console.log(`error -> ${command} missing a help.name, or help.name is not a string.`);
                  save = `\`\`\`error -> ${command} missing a help.name, or help.name is not a string.\`\`\``;
                  continue;
              
              }
      
              if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
          }
      });
    }
  return save
} // All super old code from a super old project, so I do not know if it will work, but it should, IN THEORY