const mongoose = require('mongoose')
const Schema = mongoose.Schema

const journalEntrySchema = new Schema({
  journal: {
    type: String,
    required: true
  },
  updated_at: {
    type: Date
  }
})

const JournalEntry = mongoose.model('journal', journalEntrySchema)

module.exports = JournalEntry
