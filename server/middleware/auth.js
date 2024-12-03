const bcrypt = require('bcrypt')

const saltRounds = 10

const hashPassword = async (plainTextPassword) => {
    try {
        const hash = await bcrypt.hash(plainTextPassword, saltRounds)
        return hash
    } catch(err) {
        console.error(err)
        throw err
    }
}

module.exports = {
    hashPassword: hashPassword
}