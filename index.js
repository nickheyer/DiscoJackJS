
// Importing Node's filesystem object/module, so that it can read the 'commands' dir and identify command files
const fs = require('node:fs');

// Importing Node's path module so that we can navigate the filesystem import above
const path = require('node:path');

// Importing Discord.js classes by using the require keyword
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

// Importing Discord Bot Token from config.json
const { token } = require('./config.json');



// Instantiating Discord Client for bot, w/ intents including "Guilds"
const client = new Client({ intents: [GatewayIntentBits.Guilds] });




// Adding a 'commands' property to the client instance, so commands are accesible in other files. Collection is a hashmap - like dict()
client.commands = new Collection();

// Getting path of commands dir and the names of js files within, returns a filtered array
const commandsPath = path.join(__dirname, 'commands');
const commandsFiles = fs.readdirSync(commandsPath).filter(file=>file.endsWith('.js'));

// Iterating through all the command files, adding valid commands to the client.commands Collection
for (const file of commandsFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    // Checking if command is valid by looking through keys for 'data' and 'execute'
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property - invalid command.`);
    }
}


/* *** ON STARTUP *** */

client.once(Events.ClientReady, c => { // Code that runs once when client is ready. "c" is passed to the function as the event parameter
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

/* *** ON INTERACTION (ASYNC) *** */

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return; // If interaction is NOT a slash command, return early
    console.log(interaction);

    const command = interaction.client.commands.get(interaction.commandName); // Will attempt to retrieve a value, using the command given as the key. If none, will be undefined

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found`); // Will log an error to hosting console if command was undefined (not found)
        return;
    }

    try {
        await command.execute(interaction);
    } catch (err) {
        console.error(err);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }


});


client.login(token);