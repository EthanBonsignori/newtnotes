const { Journal, Contact } = require('../models')
const findContactLinks = require('../utils/journalParser')

const journal = {
  findAll: (req, res) => {
    try {
      Journal.find((err, entries) => {
        if (!entries) return res.status(404).json({ message: 'No saved entries found.' })
        if (err) return res.status(400).json({ message: `${err.name} | Error retrieving saved entries` })
        res.status(200).json(entries)
      })
    } catch (err) {
      console.log(err)
    }
  },

  create: async (req, res) => {
    const contactLinks = await findContactLinks(req.body.journal)
    const newJournal = new Journal({
      journal: req.body.journal,
      title: req.body.title,
      contactLinks
    })
    try {
      newJournal.save(async (err, journal) => {
        if (err) return console.log(err)
        Contact.updateMany({ _id: { $in: contactLinks } }, { $push: { journalLinks: journal._id } }, { multi: true }, (err, contacts) => {
          if (err) return console.log(err)
        })
      })
    } catch (err) {
      console.log(err)
      res.status(400).json({ err: err.message })
    }
  }
}

module.exports = journal
