const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const port = 3001
const { db } = require('./models')

const images = require('./routes/images')
const pdfs = require('./routes/pdfs')
const study = require('./routes/study')
const events = require('./routes/events')
const user = require('./routes/user')

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/images', images)
app.use('/pdfs', pdfs)
app.use('/study', study)
app.use('/events', events)
app.use('/user', user)

db.sequelize.sync({ alert: true, force: false }).then(() => {
    console.log('DB Synced')
})

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({ success: false, message: 'Something went wrong', err })
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})