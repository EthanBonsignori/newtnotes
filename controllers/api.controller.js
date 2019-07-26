const { Contact, JournalEntry } = require('../models')
const findContactLinks = require('../utils/journalParser')

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

  findQueryContact: (req, res) => {
    const query = req.params.query
    try {
      Contact.find({ 'name': { $regex: '^' + query, $options: 'i' } }, 'name', { limit: 5 }, (err, contacts) => {
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
    const contactLinks = await findContactLinks(req.body.journal)
    const newEntry = new JournalEntry({
      journal: req.body.journal,
      contactLinks
    })
    try {
      newEntry.save()
    } catch (err) {
      console.log(err)
      res.status(400).json({ err: err.message })
    }
  }
}
