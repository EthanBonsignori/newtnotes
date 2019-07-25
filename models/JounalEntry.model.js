const mongoose = require('mongoose')
const Schema = mongoose.Schema

const journalEntrySchema = new Schema({
  journal: {
    type: String,
    required: true
  },
  updatedAt: {
    type: Date
  },
  contactLinks: [{ type: Schema.Types.ObjectId, ref: 'Contact' }]
})

const JournalEntry = mongoose.model('journal', journalEntrySchema)

module.exports = JournalEntry
