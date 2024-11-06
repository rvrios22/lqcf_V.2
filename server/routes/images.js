const express = require('express')
const router = express.Router()

const path = require('path')

router.get('/:img', (req, res, next) => {
    const imgName = req.params.img
    const options = {
        root: path.join(__dirname, '..', 'public','imgs')
    }

    res.sendFile(imgName, options, (err) => {
        if (err) {
            next(err)
        } else {
            console.log(`Sent: ${imgName}`)
        }
    })
})

module.exports = router