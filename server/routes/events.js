const express = require('express')
const router = express.Router()
const { Event } = require('../models')

router.get('/', async (req, res, next) => {
    try {
        const events = await Event.findAll({ order: [['date', 'ASC']] })
        res.status(200).json({ success: true, events })
    } catch (err) {
        res.status(500).json({ success: false, err })
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    const { title, description, date } = req.body
    try {
        const event = await Event.create({
            title: title,
            description: description,
            date: date
        })
        res.status(201).json({ success: true, event })
    } catch (err) {
        res.json({ success: false, message: err.message })
        next(err)
    }

})

router.put('/:id', async (req, res, next) => {
    const eventId = req.params.id
    const { title, description, date } = req.body
    try {
        const event = await Event.findOne({
            where: {
                id: eventId
            }
        })
        if (!event) {
            res.status(404).json({ success: false, message: 'The event was not found' })
            return
        }
        await event.update({
            title: title,
            description: description,
            date: date
        })
        res.status(200).json({ success: true, event })
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    const eventId = req.params.id
    try {
        const event = await Event.destroy({
            where: {
                id: eventId
            }
        })
        if (!event) {
            res.status(404).json({ success: false, message: 'The event was not found' })
            return
        }
        res.status(201).json({ success: true, message: "Event was deleted" })
    } catch (err) {
        res.status(500).json({ success: false, err })
        next(err)
    }
})

module.exports = router