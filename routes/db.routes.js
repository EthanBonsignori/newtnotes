const router = require('express').Router()
const dbController = require('../controllers/db.controller')

router.route('/contact')
  .get(dbController.findAllContact)
  .post(dbController.createContact)

router.route('/journal')
  .get(dbController.findAllJournalEntry)
  .post(dbController.createJournalEntry)

module.exports = router
