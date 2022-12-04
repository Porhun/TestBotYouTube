const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')
const token = '5832209134:AAFKvZDM5tHaFJeTnWxdShXLFCXredTV14s'

const bot = new TelegramApi(token, {polling: true})

const chats = {}



const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать!')
            const randomNumber = Math.floor(Math.random()*10)
            chats[chatId] = randomNumber;
            await bot.sendMessage(chatId, 'Отгадывай', gameOptions)
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Получить информацию о пользователе'},
        {command: '/game', description: 'Играть в игру'}
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
    
        if (text === '/start') {
           await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/e4d/0d1/e4d0d1cd-3c66-46b7-9ac6-0b897a81320a/1.webp')
           return bot.sendMessage(chatId, 'Добро пожаловать в телеграм бот');
        }
        if (text === '/info') {
           return bot.sendMessage(chatId, 'Тебя зовут ' + msg.from.first_name);
        }
        if (text === '/game'){
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, 'Я тебя не понимаю')

    })

    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId);

        }
        if (data === chats[chatId]) {
            return bot.sendMessage(chatId, 'Поздравляю ты отгадал цифру ' + chats[chatId], againOptions)
        } else {
            return bot.sendMessage(chatId, 'К сожалению ты не угадал цифру ' + chats[chatId], againOptions)
        }

        //bot.sendMessage(chatId, 'Ты выбрал цифру ' + data)
        //console.log(msg)
    })
}

start()
