const mongoose = require('mongoose')
const Schema = mongoose.Schema

const journalSchema = new Schema({
  journal: {
    type: String,
    required: true
  },
  title: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date
  },
  contactLinks: [{ type: Schema.Types.ObjectId, ref: 'contact' }]
})

const Journal = mongoose.model('journal', journalSchema)

module.exports = Journal
