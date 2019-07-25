// const passport = require('passport')

module.exports = {
  getUser: (req, res) => {
    if (!req.user) res.json({ message: 'no user found' })
    else res.send(req.user)
  },

  logout: (req, res) => {
    res.send('logging out')
  },

  redirectGoogle: (req, res) => {
    res.redirect('http://localhost:3000/profile')
  }

}
