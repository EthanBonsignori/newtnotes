const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const apiRoutes = require('./routes/api.routes')
const authRoutes = require('./routes/auth.routes')
const app = express()

// Middleware
app.use(logger('dev'))
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  next()
})

// Passport
const passport = require('./config/passport.config')()
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/api', apiRoutes)
app.use('/auth', authRoutes)

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/newtnotesDB'
mongoose.connect(MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true
}, () => {
  console.log('Mongo connection established')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})
