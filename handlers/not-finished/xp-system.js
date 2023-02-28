const sqlite3 = require('sqlite3')
const { interaction } = require('../../commands/Owner/shutdown')
const config = require('../config.json')
const discord = require('discord.js')

const db = new sqlite3.Database('../databases/xp.db', (err) => {
    if (err) {
        console.error(err.message)
    }
    console.log('Connected to the xp database.')
})

// I doubt this will work, and I mean all of this btw

db.run('CREATE TABLE IF NOT EXISTS xp (id INTEGER, user TEXT, guild INTEGER, xp INTEGER, level INTEGER)')

function connectionclose() {
    /* Close the database connection */
    db.close((err) => {
        if (err) {
            console.error(err.message)
        }
        console.log('Close the database connection.')
    })
};

function addxp(interaction, user, xp) {
    /* Add xp to a user */
    if (interaction.user.id == config.ownerID) {
        db.run(`UPDATE xp SET xp = xp + ${xp} WHERE id = '${user}'`)
    } else {
        interaction.reply({ content: "You are not a wizard harry!", ephemeral: true })
    }
};

function addlevel(interaction, user, level) {
    /* Add levels to a user */
    if (interaction.user.id == config.ownerID) {
        db.run(`UPDATE xp SET level = level + ${level} WHERE id = '${user}'`)
    } else {
        interaction.reply({ content: "You are not a wizard harry!", ephemeral: true })
    }
};

function setxp(interaction, user, xp) {
    /* Set xp to a user */
    if (interaction.user.id == config.ownerID) {
        db.run(`UPDATE xp SET xp = ${xp} WHERE id = '${user}'`)
    } else {
        interaction.reply({ content: "You are not a wizard harry!", ephemeral: true })
    }
};

function setlevel(interaction, user, level) {
    /* Set levels to a user */
    if (interaction.user.id == config.ownerID) {
        db.run(`UPDATE xp SET level = ${level} WHERE id = '${user}'`)
    } else {
        interaction.reply({ content: "You are not a wizard harry!", ephemeral: true })
    }
};

function getxp(interaction, user) {
    /* Get xp from a user */
    if (interaction.user.id == config.ownerID) {
        db.get(`SELECT xp FROM xp WHERE id = '${user}'`, (err, row) => {
            if (err) {
                console.error(err.message)
            }
            return row
        })
    } else {
        interaction.reply({ content: "You are not a wizard harry!", ephemeral: true })
    }
};

function getlevel(interaction, user) {
    /* Get levels from a user */
    if (interaction.user.id == config.ownerID) {
        db.get(`SELECT level FROM xp WHERE id = '${user}'`, (err, row) => {
            if (err) {
                console.error(err.message)
            }
            return row
        })
    } else {
        interaction.reply({ content: "You are not a wizard harry!", ephemeral: true })
    }
};