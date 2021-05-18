let express = require('express');
let app = express();
let path = require('path');
const TelegramBot = require('node-telegram-bot-api');
// replace the value below with the Telegram token you receive from @BotFather
const token = '1876235746:AAEVnEHQFMD0lvcrybs0p8Quc0eELweadrI';

// Create a bot that uses 'polling' to fetch new updates
//const bot = new TelegramBot(token, {polling: true});





//Routes
let basic = require('../routes/index')
app.use(basic)




app.use(express.static('public'))



const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`Server has started on port ${PORT}`))




