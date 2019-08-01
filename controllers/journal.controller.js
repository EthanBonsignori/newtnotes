const { Journal, Contact } = require('../models')
const findContactLinks = require('../utils/journalParser')

const journal = {
  findAll: (req, res) => {
    try {
      Journal.find()
        .sort({ updatedAt: -1 })
        .exec((err, entries) => {
          if (!entries) return res.status(404).json({ message: 'No saved entries found.' })
          if (err) return res.status(400).json({ message: `${err.name} | Error retrieving saved entries` })
          res.status(200).json(entries)
        })
    } catch (err) {
      console.log(err)
    }
  },

  findOne: (req, res) => {
    const id = req.params.id
    try {
      Journal.findById(id)
        .populate('contactLinks')
        .exec((err, journal) => {
          if (err) return res.status(404)
          res.status(200).json(journal)
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
      newJournal.save({ new: true }, async (err, journal) => {
        if (err) return console.log(err)
        Contact.updateMany({ _id: { $in: contactLinks } }, { $push: { journalLinks: journal._id } }, { multi: true }, (err, contacts) => {
          if (err) return console.log(err)
          res.status(201).json({ journal, contacts })
        })
      })
    } catch (err) {
      console.log(err)
      res.status(400).json({ err: err.message })
    }
  },

  update: async (req, res) => {
    const id = req.params.id
    const { journal, title } = req.body
    const contactLinks = await findContactLinks(journal)
    console.log(contactLinks)
    await Contact.updateMany({ journalLinks: id }, { $pull: { journalLinks: id } }, { multi: true })

    const newContacts = await Contact.updateMany({ _id: { $in: contactLinks } }, { $push: { journalLinks: journal._id } }, { multi: true })
    const newJournal = await Journal.updateOne({ _id: id }, { $set: { journal, title, contactLinks } }, { new: true })

    try {
      res.status(200).json({
        newContacts,
        newJournal
      })
      console.log(newContacts)
      console.log(newJournal)
    } catch (err) {
      console.log(err)
      res.status(400).json({ err: err.message })
    }
  },

  delete: async (req, res) => {
    const id = req.params.id
    try {
      Journal.deleteOne({ _id: id }, (err, journal) => {
        if (err) return console.log(err)
        res.status(200).json({ id })
      })
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = journal
