const { Client, GatewayIntentBits } = require('discord.js');
const mongoose = require("mongoose");
const shortid = require("shortid");
const validator = require("validator");

const Url = require("./models/url");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

mongoose.connect("mongodb://127.0.0.1:27017/url")
    .then(() => { console.log("mongoDB connected") })
    .catch((err) => { console.log(err) });

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith('create')) {
        const originalURL = message.content.split(" ")[1];
        console.log(originalURL)
        if (validator.isURL(originalURL)) {
            try {
                let shortURLKey;
                let url = await Url.findOne({ originalURL });

                if (url) {
                    shortURLKey = url.shortURLKey;
                } else {
                    shortURLKey = shortid.generate();
                    url = new Url({
                        originalURL,
                        shortURLKey
                    });
                    await url.save();
                }

                message.reply({
                    content: shortURLKey
                });
            } catch (err) {
                console.log(err);
            }
        } else {
            message.reply({ content: "invalid url" });
        }
    } else {
        message.reply({
            content: `hi ${message.author.username}-from bot`
        });
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});

client.login('**TOKEN**');
