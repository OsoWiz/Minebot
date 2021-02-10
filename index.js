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
    host: '192.168.1.69',
    port: 25565,
    username: EMAIL,
    password: PASSWORD,
    version: false,
    auth: 'mojang'
})

bot.loadPlugin(pathfinder)

function printID(itemName) {
    if(!itemName) {
        bot.chat('No item specified')
        return
    }
    const item = bot.mcData.itemsByName[itemName]
    if(item) bot.chat(`${itemName}: ${item.id}`)
    else bot.chat(`${itemName} doesn't exist`)
}

function followPlayer(playerName, calledBy) {
    let player;

    if(!playerName) player = bot.players[calledBy]
    else player = bot.players[playerName]

    if(!player || !player.entity) {
        bot.chat(`Can't find ${playerName}`)
        return
    }

    const mcd = bot.mcData
    const movements = new Movements(bot, mcd)

    bot.pathfinder.setMovements(movements)

    const goal = new GoalFollow(player.entity, 1)
    bot.pathfinder.setGoal(goal, true)
}

function findBlock(blockName) {
    if(!blockName) {
        bot.chat('No block specified') 
        return
    }
    const mcd = bot.mcData
    const blockObject = mcd.blocksByName[blockName]

    if(!blockObject) {
        bot.chat(`${blockName} doesn't exist`)
        return
    }

    const block = bot.findBlock({
        matching: blockObject.id,
        maxDistance: 200
    })

    if(!block) {
        bot.chat(`No ${blockName} found nearby`)
        return
    }
    
    const goalPos = block.position
    const movements = new Movements(bot, mcd)
    const goal = new GoalBlock(goalPos.x, goalPos.y, goalPos.z)

    bot.pathfinder.setGoal(goal)

}


bot.once('spawn', () => {
    bot.chat('bongo in the congo')
    bot.mcData = require('minecraft-data')(bot.version)
    mineflayerViewer(bot, { port: 3007, firstPerson: true })
})

bot.on('chat', (username, message) => {
    if(username === bot.username) return

    if(message[0] == '!') {
        const argv = message.split(' ')
        switch(argv[0]) {
            case '!follow':
                followPlayer(argv[1], username)
                break
            case '!stop':
                bot.pathfinder.setGoal(null, false)
                break
            case '!id':
                printID(argv[1])
                break
            case '!findblock':
                findBlock(argv[1])
                break
            default:
                bot.chat('Meep morp robot sounds')
                break
        }
    }
})

module.exports = {
    bot
}
