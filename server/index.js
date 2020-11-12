const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const mealRouter = require('./routes/MovieRouter')

const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
	res.send('Howdy!')
})

app.use('/api', mealRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))