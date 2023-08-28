import { ApartmentModel, UserModel } from "./db/apartment";
import { initDatabase } from "./db/apartment/init-database";
import { Config } from "./domains/config";
import { Utils } from "./utils";

const TelegramBot = require('node-telegram-bot-api');
const botToken = Config.botToken;
const bot = new TelegramBot(botToken, { polling: true });
initDatabase();

async function main(): Promise<void> {

    const apartments = await ApartmentModel.find({ sent: { $ne: true } })
    const chatId = await UserModel.find()
    /*await bot.onText(/\/start/, async (msg: any) => {
        console.log(msg.chat.id)
    })*/
    
    for (const apartment of apartments) {
        try{
            const message = `ID: ${apartment.id}\nTitle: ${apartment.title}\nPrice: ${apartment.price}\nHTML: ${apartment.html}`;
            await bot.sendMessage(chatId[0].chatId, message);
            await Utils.sleep(2000);
            apartment.sent = true;
            await apartment.save();
        } catch (error) {
            await bot.sendMessage(error, 'Произошла ошибка при отправке данных.');
        }
    }
}

setInterval(main, 30 * 1000);

main();