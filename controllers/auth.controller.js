// const passport = require('passport')

module.exports = {
  logout: (req, res) => {
    res.send('logging out')
  },

  // loginWithGoogle: function () {
  //   passport.authenticate('google', {
  //     scope: ['profile']
  //   })
  // },

  redirectGoogle: (req, res) => {
    res.redirect('http://localhost:3000/profile')
  }

}
