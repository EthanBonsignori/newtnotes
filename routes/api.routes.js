const router = require('express').Router()
const apiController = require('../controllers/api.controller')

router.route('/contact')
  .get(apiController.findAllContact)
  .post(apiController.createContact)

router.route('/contact/:query')
  .get(apiController.findQueryContact)

router.route('/journal')
  .get(apiController.findAllJournalEntry)
  .post(apiController.createJournalEntry)

module.exports = router
