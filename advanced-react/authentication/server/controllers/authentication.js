const jwt = require('jwt-simple');

const User = require('../models/user');
const { jwtSecret } = require('../config');

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  // We need to create jwt by using "id" of user NOT "email" because email might change in the future but "id" is stored in the database that doesn't change
  // We have to use the "sub" property short form of "subject", it is a convention for whom this jwt is created for
  // "iat" is another convention for jwt which stands for "issuedAtTime"
  return jwt.encode({ sub: user.id, iat: timestamp }, jwtSecret.secret);
};

exports.signin = (req, res, next) => {
  // User has already had their email and password auth'd by passport
  // We just need to give them a token

  // req.user is set by passport when calling the done callback
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(422).send({ error: 'You must provide email and password' });
    // Make sure to return so that two responses doesn't be sent.
    // If two responses are sent the express wil throw an error that will crash the application
    return;
  }

  // See if the user with email exists
  User.findOne({ email }, (err, existingUser) => {
    if (err) return next(err);

    // If the user with email exist, return an error
    // 422: means unprocessable entity
    if (existingUser) {
      return res.status(422).send({
        error: 'Email is in use',
      });
    }
  });

  // If user with email doesn't exist create a new user and store in the mongodb database using userModel
  const user = new User({ email, password });
  // Calling the new user constructor doesn't save the user, it just creates in the memory
  // user.save() call actually save in the database
  user.save(err => {
    if (err) return next(err);

    // Respond the request indicating the user was created
    res.status(200).json({
      status: 'success',
      token: tokenForUser(user),
    });
  });
};
