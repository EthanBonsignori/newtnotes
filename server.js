const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  next()
})

// Cookie-session
app.use(cookieSession({
  name: 'Newtnotes User',
  keys: [process.env.COOKIE_KEY],
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
}))

// Passport
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport.config')

// Routes
app.use('/api', apiRoutes)
app.use('/auth', authRoutes)

mongoose.connect('mongodb://localhost/newtnotesDB', {
  useCreateIndex: true,
  useNewUrlParser: true
}, () => {
  console.log('Mongo connection established')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})
