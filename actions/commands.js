//Basic commands for bot to take. 

//Moves given bot to direction ('forward', 'back', 'left' or 'right')
const move = (bot, direction) => {
    bot.setControlState(direction, true)
}

const move1 = (bot) => {
    bot.moveVehicle(0.0, 1.0)
}

module.exports = {
    move, 
    move1
}