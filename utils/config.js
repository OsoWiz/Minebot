require('dotenv').config() 


const EMAIL = process.env.EMAIL
const PASSWORD = process.env.PASSWORD

module.exports = {
    EMAIL,
    PASSWORD
}