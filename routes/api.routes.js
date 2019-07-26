const router = require('express').Router()
const { contact, journal } = require('../controllers')

router.route('/contact')
  .get(contact.findAll)
  .post(contact.create)

router.route('/contact/:query')
  .get(contact.findQueryContact)

router.route('/journal')
  .get(journal.findAll)
  .post(journal.create)

module.exports = router
