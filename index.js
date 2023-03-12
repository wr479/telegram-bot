const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')


const token = "";

const bot = new TelegramApi(token, {polling:true});



const chats ={};

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать!`);
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
}

	const start = async()  =>{
		bot.setMyCommands([
			{command: '/start', description: 'Начальное приветствие'},
			{command: '/info', description: 'Информация'},
			{command: '/game', description: 'Игрa'},
			{command: '/weather',description:'Погода(soon)'},
			{command: '/crypto',description:'Крипто курс(soon)'}
		]);

	bot.on("message",async msg => {

			const text = msg.text;
			const chatId = msg.chat.id;

			if (text === "/again") {
				 return startGame(chatId);
			}
			if (text === "/start") {
				await bot.sendMessage(chatId, "Приветсвую! Я тестовый бот своего создателя @wr479,я мало чего умею,но надеюсь буду вам полезен 🙂");
				return bot.sendSticker(chatId, "https://tlgrm.eu/_/stickers/402/859/40285948-f0c5-4206-bb85-bce0914f6cc2/9.webp");
			};
			if (text === '/info') {
				return bot.sendMessage(chatId, `Tебя зовут ${msg.from.first_name}`);
			}
			if (text === '/game')  {
				return startGame(chatId);
			}

			
		});
		
		bot.on('callback_query',async msg =>{
			const data = msg.data;
			const chatId = msg.message.chat.id;
			if(data == '/again'){
				return startGame(chatId);
			}
			if(data === chats[chatId]){
				await bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}`, againOptions );
			}else{
				await bot.sendMessage(chatId, `Увы,но ты не угадал. Я загадал цифру ${chats[chatId]}`, againOptions); 
			}
			
		})
		
	

}
start();


	
