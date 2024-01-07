import { match } from 'assert';
import CONFIG from './config.json';
import * as Discord from 'discord.js';

const TWITTER_MATCHER = /(.*)(https\:\/\/)(twitter|x\.com)(\/.+\/status\/[\w\/]*)(.*)/g;
const TWITTER_FIX: string = 'vxtwitter.com';

const TIK_TOK_MATCHER = /(.*)(https:\/\/)(www.tiktok.com)(\/t\/[\w\/]*)(.*)/g;
const TIK_TOK_FIX = 'vxtiktok.com';

const INSTA_MATCHER = /(.*)(https:\/\/)(www.instagram.com)(\/p\/[\w\/]*)(.*)/g;
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
        newMessage = message.content.replace(TWITTER_MATCHER, `$2${TWITTER_FIX}$4`);
        replaced = true;
    }
    if(TIK_TOK_MATCHER.test(message.content)){
        newMessage = message.content.replace(TIK_TOK_MATCHER, `$2${TIK_TOK_FIX}$4`);
        replaced = true;
    }
    if(INSTA_MATCHER.test(message.content)){
        newMessage = message.content.replace(INSTA_MATCHER, `$2${INSTA_FIX}$4`);
        replaced = true;
    }
    
    if(replaced) {
        await message.channel.send(newMessage);
    }
});

