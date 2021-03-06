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
  middleName: String,
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
  journalLinks: [{ type: Schema.Types.ObjectId, ref: 'journal' }],

  createdAt: {
    type: Date,
    default: Date.now(),
    unique: true
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
})

contactSchema.pre('save', (next) => {
  this.updatedAt = Date.now()
  next()
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact
