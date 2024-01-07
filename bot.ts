import * as CONFIG from './config.json';
import * as Discord from 'discord.js';

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Client ready');
});

client.login(CONFIG.secret);

client.on('message', async message => {
    if(message.content === 'ping') message.channel.send('pong');
});