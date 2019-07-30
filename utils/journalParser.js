const { Contact } = require('../models')

const findContactLinks = async (journal) => {
  const contactLinks = new Set([])
  // TODO: Only get logged in user's contacts
  const contacts = await Contact.find()
  contacts.forEach(contact => {
    if (journal.includes(contact.name)) {
      contactLinks.add(contact._id)
    }
  })
  return [...contactLinks]
}

module.exports = findContactLinks
