
// Importing the SlashCommandBuilder class from Discord.js
const { SlashCommandBuilder } = require('discord.js');

const wait = require('node:timers/promises').setTimeout;

// Exporting 'data' and 'exectute' so it can be imported by index.js or elsewhere
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        await interaction.reply('Pong!');
        await wait(4000);
        await interaction.editReply('Pong again!');
    },
};