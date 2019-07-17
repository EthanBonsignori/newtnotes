const { Contact, JournalEntry, User } = require('../models')

module.exports = {
  findAllContact: (req, res) => {
    try {
      Contact.find((err, contacts) => {
        if (!contacts) return res.status(404).json({ message: 'No saved contacts found.' })
        if (err) return res.status(400).json({ message: `${err.name} | Error retrieving saved contacts` })
        res.status(200).json(contacts)
      })
    } catch (err) {
      console.log(err)
    }
  },

  findAllJournalEntry: (req, res) => {
    try {
      JournalEntry.find((err, entries) => {
        if (!entries) return res.status(404).json({ message: 'No saved entries found.' })
        if (err) return res.status(400).json({ message: `${err.name} | Error retrieving saved entries` })
        res.status(200).json(entries)
      })
    } catch (err) {
      console.log(err)
    }
  },

  createContact: async (req, res) => {
    const newContact = new Contact(req.body)
    console.log(req.body)
    try {
      const saveContact = await newContact.save()
      console.log(saveContact)
      res.status(200).json(saveContact)
    } catch (err) {
      console.log(err)
      res.header('Access-Control-Allow-Origin', '*')
      res.status(400).json({ err: err.message })
    }
  },

  createJournalEntry: async (req, res) => {
    const newEntry = new JournalEntry(req.body)
    try {
      const saveEntry = await newEntry.save()
      console.log(saveEntry)
    } catch (err) {
      console.log(err)
      res.status(400).json({ err: err.message })
    }
  }
}
