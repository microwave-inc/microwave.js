const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { steamapikey } = require('../../config.json'); // Get the Steam Web API key.

module.exports.help = {
    name: 'steam',
    cat: 'Info',
    aliases: ['steam'],
    desc: 'Get a steam profile',
    data: new SlashCommandBuilder()
        .setName('steam')
        .setDescription('Get a steam profile')
        .addSubcommand(subcommand =>
            subcommand
                .setName('steamid')
                .setDescription('Get a steam profile via the steam ID')
                .addStringOption(option =>
                    option
                        .setName('steamid')
                        .setDescription('The steam ID of the user')
                        .setRequired(true)
                ))
        .addSubcommand(subcommand =>
            subcommand
                .setName('steamlink')
                .setDescription('Get a steam profile via the custom steam link')
                .addStringOption(option =>
                    option
                        .setName('steamlink')
                        .setDescription('The steam link of the user')
                        .setRequired(true)
                ))
}

module.exports.interaction = async (interaction, client) => {
    const steamid = interaction.options.getString("steamid"); // Get the steam ID.
    const api = await fetch("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=" + steamapikey + '&steamids=' + steamid) // Get the steam profile.
    const data = await api.json(); // Get the data.
    const subcommand = interaction.options.getSubcommand(); // Get the subcommand.

    if (subcommand == 'steamid') {

    /**
     * Example output:
     * {
  "response": {
    "players": [
      {
        "steamid": "76561199086539775",
        "communityvisibilitystate": 3,
        "profilestate": 1,
        "personaname": "Savave66",
        "commentpermission": 1,
        "profileurl": "https://steamcommunity.com/id/Savave66/",
        "avatar": "https://avatars.steamstatic.com/745ee92fc8766af901f71cc32ada914dcc8b15a0.jpg",
        "avatarmedium": "https://avatars.steamstatic.com/745ee92fc8766af901f71cc32ada914dcc8b15a0_medium.jpg",
        "avatarfull": "https://avatars.steamstatic.com/745ee92fc8766af901f71cc32ada914dcc8b15a0_full.jpg",
        "avatarhash": "745ee92fc8766af901f71cc32ada914dcc8b15a0",
        "lastlogoff": 1690004263,
        "personastate": 1,
        "realname": "Ayden",
        "primaryclanid": "103582791469062199",
        "timecreated": 1598591661,
        "personastateflags": 0,
        "loccountrycode": "US",
        "locstatecode": "WA",
        "loccityid": 4040
      }
    ]
  }
}
     */
    if (!api.ok) { return interaction.reply({ content: 'The API did not respond correctly, please try again later', ephemeral: true }); }; // Check if the API responds with anything other than 200 (OK)
    if (!data.response.players[0].steamid) { // Check if ID is invalid
        const embed = new MessageEmbed()
            .setTitle('Steam Profile')
            .setDescription('Steam profile not found.')
            .setColor('RED')
        return interaction.reply({ embeds: [embed] })
    }; 
    if (!data.response.communityvisibilitystate == 3 ) {// Check if the profile is private.
        const embed = new MessageEmbed()
            .setTitle('Steam Profile')
            .setDescription('Steam profile is private.')
            .setColor('RED')
        return interaction.reply({ embeds: [embed] })
    };
    const embed = new MessageEmbed()
        .setTitle('Steam Profile')
        .setDescription('Steam profile found.')
        .setColor('GREEN')
        .setThumbnail(data.response.players[0].avatarfull)
        .addFields(
            { name: 'Username', value: data.response.players[0].personaname, inline: true },
            { name: 'Real Name', value: data.response.players[0].realname, inline: true },
            { name: 'Country', value: data.response.players[0].loccountrycode, inline: true },
            { name: 'Profile URL', value: data.response.players[0].profileurl, inline: true },
            { name: 'Time Created', value: '<t:'+data.response.players[0].timecreated+':R>', inline: true },
            { name: 'Last Logoff', value: '<t:'+data.response.players[0].lastlogoff+':R>', inline: true },
        )
    return interaction.reply({ embeds: [embed] })
    } else if (subcommand == 'steamlink') {
        const steamlink = interaction.options.getString("steamlink"); // Get the steam link.
        const steamid = await fetch("http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=" + steamapikey + '&vanityurl=' + steamlink) // Get the steam ID.")
        const steamidjson = await steamid.json(); // Get the steam ID data.
        
        

        if (steamidjson.response.success === 42) { // Check if the steam link is invalid.
            const embed = new MessageEmbed()
                .setTitle('Steam Profile')
                .setDescription('Steam profile not found.')
                .setColor('RED')
            return interaction.reply({ embeds: [embed] })
        };
        // Wait till we can verify that the steam link is valid.
        const api = await fetch("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=" + steamapikey + '&steamids=' + steamidjson.response.steamid) // Get the steam profile.
        const data = await api.json(); // Get the data.

        if (!api.ok) { return interaction.reply({ content: 'The API did not respond correctly, please try again later', ephemeral: true }); }; // Check if the API responds with anything other than 200 (OK)
        if (!data.response.players[0].steamid) { // Check if ID is invalid
            const embed = new MessageEmbed()
                .setTitle('Steam Profile')
                .setDescription('Steam profile not found.')
                .setColor('RED')
            return interaction.reply({ embeds: [embed] })
        };
        if (!data.response.communityvisibilitystate == 3 ) {// Check if the profile is private.
            const embed = new MessageEmbed()
                .setTitle('Steam Profile')
                .setDescription('Steam profile is private.')
                .setColor('RED')
            return interaction.reply({ embeds: [embed] })
        };
        const embed = new MessageEmbed()
            .setTitle('Steam Profile')
            .setDescription('Steam profile found.')
            .setColor('GREEN')
            .setThumbnail(data.response.players[0].avatarfull)
            .addFields(
                { name: 'Username', value: data.response.players[0].personaname, inline: true },
                { name: 'Real Name', value: data.response.players[0].realname, inline: true },
                { name: 'Country', value: data.response.players[0].loccountrycode, inline: true },
                { name: 'Profile URL', value: data.response.players[0].profileurl, inline: true },
                { name: 'Time Created', value: '<t:'+data.response.players[0].timecreated+':R>', inline: true },
                { name: 'Last Logoff', value: '<t:'+data.response.players[0].lastlogoff+':R>', inline: true },
                )
            return interaction.reply({ embeds: [embed] })

    }
};