const { Journal } = require('../models')
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
    const newEntry = new Journal({
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

module.exports = journal
