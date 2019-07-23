const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const User = require('../models/User.model')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/redirect'
  }, async (acessToken, refreshToken, profile, done) => {
    // Check if existing user
    const currentUser = await User.findOne({ googleID: profile.id })
    if (currentUser) return done(null, currentUser)
    // Create new user
    const newUser = await new User({
      googleID: profile.id,
      displayName: profile.displayName,
      familyName: profile.name.familyName,
      givenName: profile.name.givenName,
      picture: profile._json.picture
    }).save()
    done(null, newUser)
  })
)
