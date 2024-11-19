const TelegramBot = require('node-telegram-bot-api');
const { MUST_JOIN } = require('./config');
const { InlineKeyboardMarkup, InlineKeyboardButton } = TelegramBot;

// Initialize bot
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (!MUST_JOIN) return; // Skip if no MUST_JOIN is specified

    try {
        // Check if the user is a member of the required channel
        try {
            const member = await bot.getChatMember(MUST_JOIN, userId);
            if (member.status !== 'member' && member.status !== 'administrator') {
                throw new Error('User is not a member');
            }
        } catch (error) {
            if (error.message === 'User is not a member') {
                // Send a message with the join link if the user is not a participant
                let link = '';
                if (/^[a-zA-Z0-9_]+$/.test(MUST_JOIN)) {
                    link = `https://t.me/${MUST_JOIN}`;
                } else {
                    const chatInfo = await bot.getChat(MUST_JOIN);
                    link = chatInfo.invite_link;
                }

                const photo = "https://telegra.ph/file/d6449feaa097dc28e2ae3.jpg";
                const caption = `❍ ʏᴏᴜ ɴᴇᴇᴅ ᴛᴏ ᴊᴏɪɴ ᴏᴜʀ ғᴀᴍɪʟʏ ᴛʜᴇɴ ᴄᴏᴍᴇ ʙᴀᴄᴋ ᴀɴᴅ ᴍᴇssᴀɢᴇ ᴍᴇ ᴀɢᴀɪɴ ᴡɪᴛʜ ❖ /start ❖`;

                await bot.sendPhoto(chatId, photo, {
                    caption: caption,
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "˹ ᴏғғɪᴄᴇ ˼", url: link }]
                        ]
                    }
                });

                return; // Stop further propagation
            }
        }
    } catch (error) {
        if (error.response && error.response.error_code === 400) {
            console.log(`Promote me as an admin in the MUST_JOIN chat: ${MUST_JOIN}`);
        }
    }
});
