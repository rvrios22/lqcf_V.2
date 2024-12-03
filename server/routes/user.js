const express = require('express')
const router = express.Router()
const { hashPassword } = require('../middleware/auth')

router.get('/sign-up', async (req, res, next) => {
    const { username, password } = req.body

    const hashedPassword = await hashPassword(password)

    res.json({ username, password: hashedPassword })
})

module.exports = router