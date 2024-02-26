import CONFIG from './config.json';
import * as Discord from 'discord.js';

const MATCHERS = [
    {
        matcher: /(.*)(https\:\/\/)(twitter\.com|x\.com)(\/.+\/status\/[\w]*)(.*)/,
        fix: 'vxtwitter.com'
    },
    {
        matcher: /(.*)(https:\/\/)(www.tiktok.com)(\/t\/[\w]*)(.*)/,
        fix: 'vxtiktok.com'
    },
    {
        matcher: /(.*)(https:\/\/)(www.instagram.com)(\/p\/[\w]*)(.*)/,
        fix: 'ddinstagram.com'
    }
]

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Client ready');
});

client.login(CONFIG.secret);

client.on('message', async message => {
    if (message.author.bot) return;

    let links = [];
    MATCHERS.forEach(matcherGroup => {
        checkForLinks(matcherGroup, message.content, links);
    })

    if (links.length > 0) {
        await message.channel.send(links.join(' '));
    }
});


function checkForLinks(matcherGroup: { matcher: RegExp, fix: string }, message: string, links: string[]) {
    const matchedGroups = matcherGroup.matcher.exec(message);

    if (matchedGroups == null) return;
    else {
        links.push(`${matchedGroups[2]}${matcherGroup.fix}${matchedGroups[4]}`);
        checkForLinks(matcherGroup, matchedGroups[5], links);
    }
}
