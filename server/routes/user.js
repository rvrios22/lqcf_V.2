const express = require('express')
const router = express.Router()
const { hashPassword, comparePasswords, assignJWTToken, verifyUser } = require('../middleware/auth')
const { User } = require('../models')


router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll()
        res.status(200).json({ success: true, users })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Something went wrong', err })
        return
    }
})

//route to verify users
router.get('/verify', verifyUser, (req, res, next) => {
    res.status(200).json({ success: true, message: 'User verified', user: req.user })
})

//register user commented out for security
// router.post('/sign-up', async (req, res, next) => {
//     const { username, password } = req.body
//     try {
//         const user = await User.create({
//             username: username,
//             password: await hashPassword(password)
//         })
//         res.status(200).json({ success: true, user })
//     } catch (err) {
//         console.error(err)
//         next(err)
//         return
//     }
// })

//log user in and assign jwt
router.post('/login', async (req, res, next) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ where: { username: username } })
        if (!user) {
            res.status(404).json({ success: false, message: 'We could not find a user with that username' })
            return
        }
        const arePasswordsMatch = await comparePasswords(password, user.password)
        if (!arePasswordsMatch) {
            res.status(401).json({ success: false, message: 'The password entered is incorrect' })
            return
        }
        const token = assignJWTToken(user)

        res.status(200).json({ success: true, message: 'User logged in', token })
    } catch (err) {
        console.error(err)
        next(err)
        return
    }
})

module.exports = router