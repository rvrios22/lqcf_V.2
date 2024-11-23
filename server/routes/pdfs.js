const express = require('express')
const router = express.Router()
const fs = require('fs')
const { pdfsUpload } = require('../middleware/multer')
const { PDF, Study } = require('../models')
router.get('/', (req, res, next) => {
    console.log(PDF)
    res.send('sent')
})

router.post('/', pdfsUpload.single('pdf'), async (req, res, next) => {
    if (!req.file) {
        res.status(400).json({ success: false, message: 'File not uploaded, please attach a PDF to upload' })
        return
    }
    if (req.file.mimetype !== 'application/pdf') {
        res.status(415).json({ success: false, message: 'Please select a PDF to upload' })
        return
    }
    const { title, studyName, date } = req.body
    const file = req.file
    try {
        let study = await Study.findOne({ where: { name: studyName } })
        if (!study) {
            study = await Study.create({ name: studyName })
        }
        const pdf = await PDF.create({
            title: title,
            pdfPath: file.path,
            studyId: study.id,
            date: date
        })
        res.json({ success: true, pdf })
    } catch (err) {
        fs.unlink(file.path, (err) => {
            if (err) {
                res.status(500).json({ success: false, message: err.message })
            }
            console.log(`file at ${file.path} was deleted`)
        })
        res.json({ success: false, message: err.message })
        next(err)
    }
})

module.exports = router