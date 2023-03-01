const mongoose = require(`mongoose`);

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'A user must have a username'],
    unique: [true, 'This username is already taken'],
  },
  email: {
    type: String,
    required: [true, 'A user must have a registered email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'A user must have a username'],
  },
  confirmPassword: {
    type: String,
    required: [true, 'A user must confirm their password'],
  },
  homeMountain: {
    type: String,
    required: [true, 'A user must have a home mountain'],
  },
  profileDescription: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('User', userSchema);
