const mongoose = require('mongoose')
const Schema = mongoose.Schema

const journalSchema = new Schema({
  journal: {
    type: String,
    required: true
  },
  updatedAt: {
    type: Date
  },
  contactLinks: [{ type: Schema.Types.ObjectId, ref: 'Contact' }]
})

const Journal = mongoose.model('journal', journalSchema)

module.exports = Journal
