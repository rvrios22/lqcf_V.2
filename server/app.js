const express = require('express')
const app = express()
const cors = require('cors')
const port = 3001

const home = require('./routes/home')

app.use(cors())
app.use(express.static('public'))

app.use('/home', home)

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})