require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

//  Bot instance
const bot = new TelegramBot(process.env.telegram_token, { polling: true });

//  This will store the group ID
let chatId;

//  Initialize command
bot.onText(/\/initbot(.*)/i, (msg, match) => {
    if (!!chatId) return;
    chatId = msg.chat.id;
    console.log('Chat ID acquired: ', chatId);
    const name = `${msg.from.first_name || ''} ${msg.from.last_name || ''}`;
    const resp = `${name} initialized the bot!`;
    bot.sendMessage(chatId, resp);
});

//  Send a string to the chat ID
const sendTelegramMessage = (message) => {
    if (!bot || !chatId || !message || typeof message === 'undefined') return;
    bot.sendMessage(chatId, message);
}

