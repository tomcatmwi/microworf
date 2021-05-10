const TelegramBot = require('node-telegram-bot-api');
const settings = require('./settings.json');

console.log(`Launching bot: ${settings.name}`);

const bot = new TelegramBot(settings.token, { polling: true });

let chatId;

//  Visszaköszön
bot.onText(/szia(.*)/i, (msg, match) => {
    chatId = msg.chat.id;
    console.log('Chat ID: ', chatId);
    const msgText = msg.text;
    const name = `${msg.from.first_name || ''} ${msg.from.last_name || ''}`;
    const resp = `Szia drága ${name}! Úgy örülök, hogy látlak!`;
    bot.sendMessage(chatId, resp);
});

//  Időnként ugat
setInterval(() => {
    if (!chatId) return;
    console.log('Ideje beugatni!');

    switch (Math.floor(Math.random() * 5)) {
        case 1: bot.sendMessage(chatId, 'Csupa szeretet kísérjen ma utadon!'); break;
        case 2: bot.sendMessage(chatId, 'Puszi-puszi, drága szépségem!'); break;
        case 3: bot.sendMessage(chatId, 'Jaj de örülök, hogy még mindig itt vagy!'); break;
        case 4: bot.sendMessage(chatId, 'De jól nézel ma ki, csak így tovább!'); break;
        case 5: bot.sendMessage(chatId, 'Olyan kis cuki vagy ma!'); break;
        default: bot.sendMessage(chatId, 'Adhatok egy puszikát?');
    }

}, 20000);