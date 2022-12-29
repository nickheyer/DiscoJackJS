# Internal Notes
By: Nicholas W. Heyer

## Errors Encountered & Solutions
1. "Error: Cannot find module 'node:events'"
- Fixed by updating Node.js by installing "n", NPM's node install manager.
- Updated Node.js to Stable build, ~18.2...

2. 

## Misc. Notes
1. Using Slash Commands syntax with Discord.js ('data')
    - "data" instantiates the SlashCommandBuilder() Class, then sets the name of the instance to the name of the command with `.setName("name")`
    - You can also set a description for the command by using `.setDescription("Description")`. This is visible to the user when looking up commands.
2. Using Slash Commands syntax with Discord.js ('execute')
    - `execute()` is an async function that is called when the slash command is invoked. The command's functionality will go within this function.
    - `interaction` is passed to the execute function. `interaction` contains various attributes that you will use within your execute function, like:
        1. `interaction.user` is the object representing the Discord User that invoked the command.
        2. `interaction.member` is the GuildMember object representing the Discord User within a specific Discord Channel (Guild).
3. Combining `module.exports`, `data`, and `execute` into a single "command file" is the standard way of working with slash commands. A working example of such can be seen below:
    ```javascript
    const { SlashCommandBuilder } = require('discord.js');

    module.exports = {
        data: new SlashCommandBuilder()
            .setName('user')
            .setDescription('Provides information about the user.'),
        async execute(interaction) {
            // interaction.user is the object representing the User who ran the command
            // interaction.member is the GuildMember object, which represents the user in the specific guild
            await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
        },
    };
    ```
4. 


