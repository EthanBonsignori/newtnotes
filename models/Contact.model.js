const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = new Schema({
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
  },
  profilePicture: {
    type: String,
    default: 'https://imgur.com/U2lpZIk'
  },
  journalLinks: [{ type: Schema.Types.ObjectId, ref: 'Journal' }]
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact
