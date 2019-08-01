const mongoose = require('mongoose')
const Schema = mongoose.Schema

const journalSchema = new Schema({
  journal: {
    type: String,
    required: true
  },
  title: String,
  contactLinks: [{ type: Schema.Types.ObjectId, ref: 'Contact' }],

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

journalSchema.pre('save', (next) => {
  this.updatedAt = Date.now()
  next()
})

const Journal = mongoose.model('journal', journalSchema)

module.exports = Journal
