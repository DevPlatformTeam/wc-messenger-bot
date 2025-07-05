const { Telegraf  } = require('telegraf');
const express = require("express");
const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new Telegraf(BOT_TOKEN);
const app = express();
const PORT = process.env.PORT || 3000;

bot.start((ctx) => {
  ctx.reply(
    `سلام 👋
به ربات ووکامرس مسنجر خوش آمدی! 🚀
هر سفارش جدید سایتت رو اینجا دریافت می‌کنی.

دستورات:
/help - راهنمای استفاده ℹ️
/about - درباره ربات 🛍️
/faq - سوالات متداول ❓
/chatid - دریافت ChatID 🆔

EN:
Welcome to Woo Messenger Bot! 🚀
Use /help for guide.`
  );
});

bot.command('help', (ctx) => {
  ctx.reply(
    `راهنمای استفاده:
۱. افزونه WooCommerce Messenger را در سایت وردپرس نصب کن.
۲.ابتدا chat id همینجا با /chatid دریافت و در تنظیمات افزونه وارد کن.
۳. سفارش جدید که ثبت شد، پیام دریافت می‌کنی.

EN:
1. Install WooCommerce Messenger plugin on your website.
2. Use /chatid to get your Chat ID.
3. Add it to plugin settings and enjoy instant notifications!`
  );
});

bot.command('about', (ctx) => {
  ctx.reply(
    `درباره ربات 🛍️
این ربات مخصوص مدیران فروشگاه‌های ووکامرس است.
برای تست و دمو رایگان، لطفاً دستور /chatid را ارسال کنید و chat id خود را در پلاگین سایت وارد نمایید.

EN:
This bot sends WooCommerce order notifications to your Telegram.
For demo, use /chatid and enter it in plugin settings.`
  );
});

bot.command('faq', (ctx) => {
  ctx.reply(
    `❓ سوالات متداول:
/chatid - دریافت ChatID
/help - راهنمای کامل نصب و اتصال
/about - اطلاعات و سازنده ربات

چطور سفارش‌ها رو در تلگرام بگیرم؟
۱. افزونه WooCommerce Messenger رو در وردپرس نصب کن
۲. دستور /chatid رو بزن و عدد رو در تنظیمات افزونه وارد کن
۳. تنظیمات رو ذخیره کن، تموم!

- چطور Chat ID بگیرم؟ با دستور /chatid دریافت کنید.
- سفارشات با چه سرعتی می‌رسد؟ آنی!
- چند نفر می‌توانند پیام بگیرند؟ نامحدود، فقط chat id های هر نفر را وارد کنید.
- آیا ربات رایگان است؟ بله، نسخه عمومی رایگان است.

EN:
❓ FAQ:
/chatid - Get your ChatID
/help - Full setup guide
/about - Bot info

How to receive orders in Telegram?
1. Install WooCommerce Messenger plugin on WordPress
2. Type /chatid and enter it in plugin settings
3. Save settings, done!

- How to get Chat ID? Use /chatid.
- How fast are orders sent? Instantly!
- Can multiple admins get notifications? Yes, unlimited.
- Is this bot free? Yes!`
  );
});

bot.command('chatid', (ctx) => {
  ctx.reply(
    `🆔 Chat ID شما:
\`${ctx.chat.id}\`

کافیست این عدد را در تنظیمات افزونه وارد کنید تا پیام سفارش‌ها را دریافت کنید.

EN:
Your Chat ID:
\`${ctx.chat.id}\`
Enter this in plugin settings.`
    , { parse_mode: "Markdown" }
  );
});

// bot.on(message('text'), (ctx) => {
//   ctx.reply('دستور موردنظر را ارسال کنید. (مثال: /help)');
// });

bot.on('text', (ctx) => {
  ctx.reply('دستور موردنظر را ارسال کنید. (مثال: /help)');
});

app.get("/", (req, res) => {
  res.send("Woo Messenger Bot is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(bot.webhookCallback('/secret-path'));
bot.telegram.setWebhook(`https://wc-messenger-bot.onrender.com/secret-path`);

console.log('Bot is running...');
