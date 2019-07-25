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
  journalLinks: [{ type: Schema.Types.ObjectId, ref: 'JournalEntry' }]
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact
