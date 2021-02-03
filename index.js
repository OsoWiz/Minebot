const mineflayer = require('mineflayer')
const mineflayerViewer = require('prismarine-viewer').mineflayer

const config = require('./utils/config')

/*Create .env file and insert EMAIL="" and PASSWORD=""
*/
const EMAIL = config.EMAIL
const PASSWORD = config.PASSWORD

const bot = mineflayer.createBot({
    host: '82.130.32.42',
    port: 25565,
    username: EMAIL,
    password: PASSWORD,
    version: false,
    auth: 'mojang'
})

bot.once('spawn', () => {
    mineflayerViewer(bot, {port: 3000})

    entity = bot.nearestEntity()
    console.log(entity)
    if(entity) {
        
        const inter = setInterval(() => {
            bot.attack(entity, true)
        }, 50)
    }
})

bot.on('chat', (username, message) => {
    if(username === bot.username) return
    bot.chat(message)
})