const express = require('express')
const app = express()
const cors = require('cors')
const port = 3001

const images = require('./routes/images')

app.use(cors())
app.use(express.static('public'))

app.use('/images', images)

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})