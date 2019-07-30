const { Contact } = require('../models')

const contact = {
  findAll: (req, res) => {
    try {
      Contact.find()
        .sort({ name: 1 })
        .populate('journalLinks')
        .exec((err, contacts) => {
          if (!contacts) return res.status(404).json({ message: 'No saved contacts found.' })
          if (err) return res.status(400).json({ message: `${err.name} | Error retrieving saved contacts` })
          res.status(200).json(contacts)
        })
    } catch (err) {
      console.log(err)
    }
  },

  findOne: (req, res) => {
    const id = req.params.id
    try {
      Contact.findById(id)
        .populate('journalLinks')
        .exec((err, contact) => {
          if (err) return res.status(404).json({ message: `${err.name} | Error finding contact by ID` })
          res.status(200).json(contact)
        })
    } catch (err) {
      console.log(err)
    }
  },

  findByQuery: (req, res) => {
    const query = req.params.query
    try {
      Contact.find({ 'name': { $regex: '^' + query, $options: 'i' } }, ['name', 'imageUrl'], { limit: 4 }, (err, contacts) => {
        if (err) return res.status(400).json({ message: `${err.name} | Error retrieving saved contacts` })
        res.status(200).json(contacts)
      })
    } catch (err) {
      console.log(err)
    }
  },

  create: async (req, res) => {
    const newContact = new Contact(req.body)
    try {
      const saveContact = await newContact.save()
      res.status(200).json(saveContact)
    } catch (err) {
      console.log(err)
      res.header('Access-Control-Allow-Origin', '*')
      res.status(400).json({ err: err.message })
    }
  },

  update: async (req, res) => {
    const id = req.params.id
    const contact = req.body
    try {
      Contact.updateOne({ _id: id }, contact, (err, contact) => {
        if (err) return console.log(err)
        res.status(200).json(contact)
      })
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = contact
