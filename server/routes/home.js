const express = require('express')
const router = express.Router()

const path = require('path')

router.get('/:header', (req, res, next) => {
    const fileName = req.params.header
    const options = {
        root: path.join(__dirname, '..', 'public','imgs')
    }

    res.sendFile(fileName, options, (err) => {
        if (err) {
            next(err)
        } else {
            console.log(`Sent: ${fileName}`)
        }
    })
})

module.exports = router