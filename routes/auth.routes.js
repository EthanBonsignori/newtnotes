const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const passport = require('passport')

router.route('/logout')
  .get(authController.logout)

// auth with google
router.route('/google')
  .get(passport.authenticate('google', { scope: ['profile'] }))

router.route('/google/redirect')
  .get(passport.authenticate('google'), authController.redirectGoogle)

module.exports = router
