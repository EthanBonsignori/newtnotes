const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const routes = require('./routes/db.routes')
const app = express()

// Middleware
app.use(logger('dev'))
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  )
  next()
})

app.use(routes)

mongoose.connect('mongodb://localhost/newtnotesDB', {
  useCreateIndex: true,
  useNewUrlParser: true
})

mongoose.connection.once('open', () => {
  console.log('Mongo connection established')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})
