// Tokens, Secrets, etc...
const secrets = require('./secrets.json');
// Discord Setup
const { Client, RichEmbed } = require('discord.js');
const dclient = new Client();
dclient.login(secrets.discordToken);
dclient.on('ready', () => {
    dclient.user.setActivity('for news', {type: 'WATCHING'});
    console.log(`Discord: ${dclient.user.tag}`);
});
// Reddit setup
/*
const snoowrap = require('snoowrap');
const r = new snoowrap({
    userAgent: secrets.redditUserAgent,
    clientId: secrets.redditClientId,
    clientSecret: secrets.redditClientSecret,
    refreshToken: secrets.redditRefreshToken
});
*/
// Twitter setup
var Twitter = require('twitter');
var tclient = new Twitter({
    consumer_key: secrets.twitterConsumerKey,
    consumer_secret: secrets.twitterConsumerSecret,
    access_token_key: secrets.twitterAccessTokenKey,
    access_token_secret: secrets.twitterAccessTokenSecret
});

// Read and remove ping
dclient.on('message', (message) => {
    if (message.channel.id !== '591295073803829264') {
        console.log(message.channel.id);
        console.log(message.content);
        return
    }
    if (message.system == true) {
        return;
    };
    if(!message.content.startsWith('@everyone')) {
        message.author.send('pls ping dd and tell him to tweet');
        return;
    };
    const msg = message.content.substring(10)
    console.log(msg);
    if (msg.length > 280) {
        message.author.send('pls ping dd and tell him to tweet');
        return
    }
    if (msg.includes('@')) {
        message.author.send('pls ping dd and tell him to tweet');
        return;
    };
    tclient.post('statuses/update', {status: msg}, function(error, tweet, responce) {
        if (error) {
            console.log(error);
        }
    });
});