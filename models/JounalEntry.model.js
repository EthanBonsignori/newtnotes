const mongoose = require('mongoose')
const Schema = mongoose.Schema

const JournalEntrySchema = new Schema({
  journal: {
    type: String,
    required: true
  }
})

const JournalEntry = mongoose.model('journal', JournalEntrySchema)

module.exports = JournalEntry
