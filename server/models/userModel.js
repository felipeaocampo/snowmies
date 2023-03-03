const mongoose = require(`mongoose`);
const bcrypt = require('bcryptjs');

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
    select: false,
    required: [true, 'A user must have a password'],
  },
  confirmPassword: {
    type: String,
    required: [true, 'A user must confirm their password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are NOT the same',
    },
  },
  homeMountain: {
    type: String,
    required: [true, 'A user must have a home mountain'],
  },
  profileDescription: {
    type: String,
    default: 'Click the edit icon to update your rider description...',
  },
  profilePhoto: {
    type: String,
    default: 'user-default-1677789708088.jpg',
  },
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;

  next();
});

/*
userSchema.pre(`save`, async function(next) {
  if (!this.isModified(`password`)) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});
*/

module.exports = mongoose.model('User', userSchema);
