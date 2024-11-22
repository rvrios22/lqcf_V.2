const express = require('express')
const { pdfsUpload } = require('../middleware/multer')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.send('hello')

})

router.post('/', pdfsUpload.single('pdf'), (req, res, next) => {
    if (!req.file) {
        res.status(400).json({ success: false, message: 'File not uploaded, please attach a PDF to upload' })
        return
    }
    if (req.file.mimetype !== 'application/pdf') {
        res.status(415).json({ success: false, message: 'Please select a PDF to upload' })
        return
    }
    res.send('accepted')
})

module.exports = router