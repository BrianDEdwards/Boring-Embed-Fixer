import { match } from 'assert';
import CONFIG from './config.json';
import * as Discord from 'discord.js';

const TWITTER_MATCHER = /(.*)(twitter\.com)(\/.+\/status\/.*)/g;
const TWITTER_FIX: string = 'vxtwitter.com';

const TIK_TOK_MATCHER = /(.*)(tiktok.com)(\/t\/.*)/g;
const TIK_TOK_FIX = 'vxtiktok.com';

const INSTA_MATCHER = /(.*)(instagram.com)(\/p\/.*)/g;
const INSTA_FIX = 'ddinstagram.com';

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Client ready');
});

client.login(CONFIG.secret);

client.on('message', async message => {
    if(message.author.bot) return;

    let replaced = false;
    let newMessage = message.content;

    if(TWITTER_MATCHER.test(message.content)){
        newMessage = message.content.replace(TWITTER_MATCHER, `$1${TWITTER_FIX}$3`);
        replaced = true;
    }
    if(TIK_TOK_MATCHER.test(message.content)){
        newMessage = message.content.replace(TIK_TOK_MATCHER, `$1${TIK_TOK_FIX}$3`);
        replaced = true;
    }
    if(INSTA_MATCHER.test(message.content)){
        newMessage = message.content.replace(INSTA_MATCHER, `$1${INSTA_FIX}$3`);
        replaced = true;
    }
    
    if(replaced) {
        await message.channel.send(newMessage);
    }
});

