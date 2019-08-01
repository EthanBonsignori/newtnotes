const router = require('express').Router()
const { contact, journal } = require('../controllers')

router.route('/contact')
  .get(contact.findAll)
  .post(contact.create)

router.route('/contact/:id')
  .get(contact.findOne)
  .put(contact.update)
  .delete(contact.delete)

router.route('/contact/query/:query')
  .get(contact.findByQuery)

router.route('/journal')
  .get(journal.findAll)
  .post(journal.create)

router.route('/journal/:id')
  .get(journal.findOne)
  .put(journal.update)
  .delete(journal.delete)

module.exports = router
