const express = require('express')
const app = express()
const cors = require('cors')
const port = 3001
const { db } = require('./models')

const images = require('./routes/images')
const pdfs = require('./routes/pdfs')
const study = require('./routes/study')
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/images', images)
app.use('/pdfs', pdfs)
app.use('/study', study)

db.sequelize.sync({ alert: true, force: false }).then(() => {
    console.log('DB Synced')
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})