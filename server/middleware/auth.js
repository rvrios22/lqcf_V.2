require('dotenv').config()
const bcrypt = require('bcrypt')
const { User } = require('../models')
const jwt = require('jsonwebtoken')

const saltRounds = 10

const hashPassword = async (plainTextPassword) => {
    try {
        const hash = await bcrypt.hash(plainTextPassword, saltRounds)
        return hash
    } catch (err) {
        console.error(err)
        throw err
    }
}

const comparePasswords = async (plainTextPassword, hashedPassword) => {
    try {
        const isPasswordCorrect = await bcrypt.compare(plainTextPassword, hashedPassword)
        return isPasswordCorrect
    } catch (err) {
        console.error(err)
        throw err
    }
}

const assignJWTToken = (user) => {
    const token = jwt.sign({
        admin: user.admin,
        username: user.username,
    },
        process.env.AUTH_SECRET,
        {
            expiresIn: '15m'
        }
    )
    return token
}

const verifyUser = (req, res, next) => {
    try {

        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.AUTH_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        res.status(403).json({ success: false, message: 'Invalid or expired token', err })
        return
    }
}

module.exports = {
    hashPassword,
    comparePasswords,
    assignJWTToken,
    verifyUser
}