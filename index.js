const mineflayer = require('mineflayer')
const mineflayerViewer = require('prismarine-viewer').mineflayer
const pathfinder = require('mineflayer-pathfinder').pathfinder
const Movements = require('mineflayer-pathfinder').Movements
const {GoalBlock, GoalFollow} = require('mineflayer-pathfinder').goals

const config = require('./utils/config')

const command = require('./actions/commands')

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

bot.loadPlugin(pathfinder)

bot.once('spawn', () => {
    mineflayerViewer(bot, {port: 3000})
    bot.chat('moromoro')
        
    const ent = bot.nearestEntity()

    const mcData = require('minecraft-data')(bot.version)

    const defaultMove = new Movements(bot, mcData)

    const p = ent.position

    bot.pathfinder.setMovements(defaultMove)
    bot.pathfinder.setGoal(GoalFollow(ent, 1))
})

bot.on('chat', (username, message) => {
    if(username === bot.username) return
    bot.chat(message)
})

module.exports = {
    bot
}