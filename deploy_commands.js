// Importing rest and routes modules from discord.js
const { REST, Routes } = require('discord.js');

// Importing clientID and token from config
const { clientId, token } = require('./config.json');

const fs = require('node:fs');

// Creating array for commands to be added
const commands = [];

// Again, looking for all js file names in commands dir
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON()); // Adding each command to commands array, in JSON format
}

// Creating REST object, to send request to Discord servers - updating available (/) commands for each 'Guild'
const rest = new REST({ version: '10' }).setToken(token);


// Deployement in anonynmous async function
(async () => {

    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log(`Succesfully reloaded ${data.length} application (/) commands`);
    } catch (err) {
        console.log(`Error encountered while loading commands to Discord Servers: ${err}`);
    }


})();