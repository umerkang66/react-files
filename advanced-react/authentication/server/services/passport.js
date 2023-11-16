const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const User = require('../models/user');
const { jwtSecret } = require('../config');

// Create local Strategy: this is only for signing in purposes
const localOp = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOp, (email, password, next) => {
  // Finding user from db
  User.findOne({ email }, (err, user) => {
    if (err) return next(err);
    if (!user) return next(null, false);

    // Comparing user.password with password came from req.body (that was provided by localStrategy)
    // This method was come from user model, that was assigned to "userSchema methods"
    user.comparePassword(password, (err, isMatch) => {
      if (err) return next(err);
      if (!isMatch) return next(null, false);

      return next(null, user);
    });
  });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: jwtSecret.secret,
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, next) => {
  // See if the user ID in the payload exists in the our database, if it does call 'next' with that, otherwise call next without a user object
  User.findById(payload.sub, (err, user) => {
    // Search fail to occur
    if (err) return next(err, false);

    if (user) next(null, user);
    // We didn't find the user
    else next(null, false);
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
