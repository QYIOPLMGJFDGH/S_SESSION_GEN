const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

// Configurations
const { BOT_TOKEN, OWNER_ID } = require('./config'); // You should put the values in a config.js or .env file

// Initialize bot
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Initialize Express app (for routes)
const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.send("String-Baby Session Gen is running...");
});

// Handle /start command
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username || msg.from.first_name;
    
    const message = `
❍ ʜᴇʏ  ${msg.from.first_name || 'there'} ✤,
❍ ɪ ᴀᴍ 𝚂𝚃𝚁𝙸𝙽𝙶 𝙱𝙰𝙱𝚈,

❍ Aɴ ᴏᴘᴇɴ sᴏᴜʀᴄᴇ sᴛʀɪɴɢ sᴇssɪᴏɴ ɢᴇɴᴇʀᴀᴛᴏʀ ʙᴏᴛ, ᴡʀɪᴛᴛᴇɴ ɪɴ ᴩʏᴛʜᴏɴ ᴡɪᴛʜ ᴛʜᴇ ʜᴇʟᴩ ᴏғ ᴩʏʀᴏɢʀᴀᴍ.

❍ ᴘʟᴇᴀꜱᴇ ᴄʜᴏᴏꜱᴇ ᴛʜᴇ ᴘʏᴛʜᴏɴ ʟɪʙʀᴀʀʏ ʏᴏᴜ ᴡᴀɴᴛ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ꜱᴛʀɪɴɢ ꜱᴇꜱꜱɪᴏɴ ꜰᴏʀ.

❍ ɪғ ʏᴏᴜ ɴᴇᴇᴅ ᴀɴʏ ʜᴇʟᴘ, ᴛʜᴇɴ ᴅᴍ ᴛᴏ ᴍʏ ᴏᴡɴᴇʀ: [ᯓ𓆰𝅃꯭᳚ ⃪♔͢༎꯭𝝦꯭ ϒ ꯭τ ꯭ዙ ꯭𝛐፝֟֟֟͠ ꯭𝛈꯭ 𓆪꯭ 𝆺꯭𝅥⇢](tg://user?id=${OWNER_ID})

    `;

    // Send photo with caption
    await bot.sendPhoto(chatId, 'https://files.catbox.moe/y9c134.jpg', {
        caption: message,
        reply_markup: {
            inline_keyboard: [
                [{ text: "˹ ɢᴇɴᴇʀᴀᴛᴇ sᴛʀɪɴɢ ˼", callback_data: "generate" }],
                [
                    { text: "˹ sᴜᴘᴘᴏʀᴛ ˼", url: "https://t.me/+OL6jdTL7JAJjYzVl" },
                    { text: "˹ ᴜᴘᴅᴀᴛᴇs ˼", url: "https://t.me/BABY09_WORLD" }
                ],
                [
                    { text: "˹ sᴏᴜʀᴄᴇ ˼", url: "https://github.com/BABY-MUSIC/BABYSTRING_GEN" },
                    { text: "˹ ᴍᴜsɪᴄ ʙᴏᴛ ˼", url: "https://t.me/BABY_MUSIC09_BOT" }
                ]
            ]
        }
    });
});

// Start Express server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
