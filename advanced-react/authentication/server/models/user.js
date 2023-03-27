const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

// Define our model or schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// On Save Hook, encrypt password
// Before saving the user, run this function
userSchema.pre('save', function (next) {
  // Get access to the user model
  const user = this;

  // Generate a salt, then run callback
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    // Hash (encrypt) our password, using the upper salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) return next(err);
      // Overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  const userPassword = this.password;

  // isMatch is boolean value
  bcrypt.compare(candidatePassword, userPassword, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

// Create the model class: The first argument is to create user collection, "collection" is a collection of documents, documents are created when a request to "createUser" came
const UserModel = mongoose.model('user', userSchema);

// Export the model
module.exports = UserModel;
