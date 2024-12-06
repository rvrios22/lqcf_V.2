const express = require('express')
const router = express.Router()
const fs = require('fs')
const { pdfsUpload } = require('../middleware/multer')
const { PDF, Study } = require('../models')
const { verifyUser } = require('../middleware/auth')
// get all PDFs
router.get('/', async (req, res, next) => {
    try {

        const pdfs = await PDF.findAll()
        res.status(200).json({ success: true, pdfs })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
        next(err)
    }
})

// get PDFs by study
router.get('/:studyName', async (req, res, next) => {
    const studyName = req.params.studyName
    if (!studyName) {
        res.status(400).json({ success: false, message: 'Params missing' })
        return
    }
    try {
        const study = await Study.findOne({ where: { name: studyName } })
        if (!study) {
            res.status(404).json({ success: false, message: 'The study does not exist' })
            return
        }
        const pdfs = await PDF.findAll({
            where: {
                studyId: study.id
            }
        })
        res.status(200).json({ success: true, pdfs })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
        next(err)
    }
})

//upload a PDF
router.post('/', verifyUser, pdfsUpload.single('pdf'), async (req, res, next) => {
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
        res.status(201).json({ success: true, pdf })
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

//edit a PDF
router.put('/:id', verifyUser, async (req, res, next) => {
    const pdfId = req.params.id
    const { title, date, studyName } = req.body
    try {
        let study = await Study.findOne({ where: { name: studyName } })
        if (!study) {
            study = await Study.create({ name: studyName })
        }
        const pdf = await PDF.findOne({ where: { id: pdfId } })
        if (!pdf) {
            res.status(404).json({ success: false, message: 'The PDF was not found' })
            return
        }
        await pdf.update({
            title: title,
            date: date,
            studyId: study.id
        })
        res.status(200).json({ success: true, pdf })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Something went wrong', error: err.message })
        next(err)
    }

})

//delete a single PDF from id
router.delete('/:id', verifyUser, async (req, res, next) => {
    const pdfId = req.params.id
    try {
        const pdf = await PDF.findOne({ where: { id: pdfId } })
        if (!pdf) {
            res.status(404).json({ success: false, message: 'The PDF was not found' })
            return
        }
        fs.unlink(pdf.pdfPath, (err) => {
            if (err) {
                res.status(500).json({ success: false, message: 'Something went wrong', err })
                return
            }
        })
        await pdf.destroy()
        res.status(200).json({ success: true, message: 'PDF was deleted' })
    } catch (err) {
        res.status(500).json({ success: false, message: 'something went wrong', error: err.message })
        next(err)
    }
})

module.exports = router