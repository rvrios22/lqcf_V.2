const express = require('express')
const router = express.Router()
const { Study } = require('../models')

router.get('/', async (req, res, next) => {
    try {
        const studies = await Study.findAll()
        res.status(200).json({ success: true, studies })
    } catch (err) {
        res.status(500).json({ success: false, error: err.message, message: 'Something went wrong' })
    }

})

module.exports = router