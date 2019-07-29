const { Contact } = require('../models')

const contact = {
  findAll: (req, res) => {
    try {
      Contact.find((err, contacts) => {
        if (!contacts) return res.status(404).json({ message: 'No saved contacts found.' })
        if (err) return res.status(400).json({ message: `${err.name} | Error retrieving saved contacts` })
        res.status(200).json(contacts)
      }).sort({ name: 1 })
    } catch (err) {
      console.log(err)
    }
  },

  findByQuery: (req, res) => {
    const query = req.params.query
    try {
      Contact.find({ 'name': { $regex: '^' + query, $options: 'i' } }, ['name', 'profilePicture'], { limit: 4 }, (err, contacts) => {
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
  }
}

module.exports = contact
