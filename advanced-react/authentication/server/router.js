const authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// Don't make the cookie-based session that is default behavior
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const router = app => {
  app.get('/', requireAuth, (req, res) => {
    res.send('Hi there');
  });
  app.post('/signin', requireSignin, authentication.signin);
  app.post('/signup', authentication.signup);
};

module.exports = router;
