const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = new Schema({
  imageUrl: String,
  name: {
    type: String,
    required: true,
    unique: true
  },
  prefix: String,
  suffix: String,
  firstName: String,
  lastName: String,
  nickname: String,
  email: String,
  phone: String,
  facebook: String,
  twitter: String,
  instagram: String,
  linkedin: String,
  address: String,
  work: String,
  relationship: String,
  birthday: Date,
  notes: String,
  journalLinks: [{ type: Schema.Types.ObjectId, ref: 'Journal' }]
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact
