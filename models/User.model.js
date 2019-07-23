const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  googleID: String,
  displayName: String,
  familyName: String,
  givenName: String,
  picture: String,
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
