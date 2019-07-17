const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContactSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  nickname: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String
  }
})

const Contact = mongoose.model('Contact', ContactSchema)

module.exports = Contact
