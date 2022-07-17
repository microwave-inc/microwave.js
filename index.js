const { Client, Intents } = require('discord.js');
const { token } = require('./config.json'); //I'll switch this to a .env later - Ayden

const Client = new Client({ intents: [intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Ready!');
});

client.login(token);
//Yes this is from the docs - Ayden