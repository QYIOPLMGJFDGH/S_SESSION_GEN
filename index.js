const express = require("express");
const { Telegraf } = require("telegraf"); // For Telegram bot functionality
const winston = require("winston"); // For logging
require("dotenv").config(); // For loading environment variables
const http = require("http");

// Load configuration from .env
const API_ID = process.env.API_ID;
const API_HASH = process.env.API_HASH;
const BOT_TOKEN = process.env.BOT_TOKEN;

if (!API_ID || !API_HASH || !BOT_TOKEN) {
  throw new Error("Missing API_ID, API_HASH, or BOT_TOKEN in environment variables.");
}

// Configure logging
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} - ${level.toUpperCase()} - ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Logs to console
  ],
});

// Initialize Express app (equivalent to Flask)
const app = express();

// Initialize Telegram bot (equivalent to Pyrogram)
const bot = new Telegraf(BOT_TOKEN);

// Logging for MongoDB equivalent
logger.info("MongoDB logging set to ERROR level.");

// Express route (Flask equivalent route)
app.get("/", (req, res) => {
  res.send("String-Baby Session Gen is running...");
});

// Function to run Express app (Flask equivalent server)
function runExpress() {
  const port = 8000;
  const server = http.createServer(app);
  server.listen(port, "0.0.0.0", () => {
    logger.info(`Express server running on http://0.0.0.0:${port}`);
  });
}

// Start Telegram bot
async function startBot() {
  try {
    await bot.telegram.getMe().then((botInfo) => {
      bot.options.username = botInfo.username;
      logger.info(`@${bot.options.username} NOW STRING-BABY SESSION GEN IS READY TO GEN SESSION`);
    });

    // Start Express server
    runExpress();

    // Launch the bot
    bot.launch();
    logger.info("Bot started...");
  } catch (error) {
    if (error.response && error.response.error_code === 401) {
      logger.error("Your BOT_TOKEN is invalid.");
    } else {
      logger.error(`An unexpected error occurred: ${error.message}`);
    }
    process.exit(1);
  }
}

// Gracefully stop bot on exit
process.on("SIGINT", () => {
  bot.stop("SIGINT");
  console.log("🇸 🇪 🇸 🇸 🇮 🇴 🇳  🇬 🇪 🇳 🇷 🇦 🇹 🇮 🇳 🇬  🇸 🇹 🇴 🇵 🇵 🇪 🇩...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  bot.stop("SIGTERM");
  console.log("🇸 🇪 🇸 🇸 🇮 🇴 🇳  🇬 🇪 🇳 🇷 🇦 🇹 🇮 🇳 🇬  🇸 🇹 🇴 🇵 🇵 🇪 🇩...");
  process.exit(0);
});

// Start the bot
startBot();
