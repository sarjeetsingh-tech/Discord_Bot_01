const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
];

const rest = new REST({ version: '10' }).setToken('MTE5NjY4MDM5Nzk4NDEyMDg1Mg.GWXEGj.ZUHUMjz-4P4SAzQGMnnLPoEnYKDr2i-j8uCYcI');
(async()=>{
try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands('1196680397984120852'), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}
})();