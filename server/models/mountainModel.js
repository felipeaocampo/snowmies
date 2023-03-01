const mongoose = require(`mongoose`);

const mountainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true, 'Entry for this mountain name already exists'],
  },
  state: {
    type: String,
    required: true,
  },
  closestCity: {
    type: String,
    required: true,
  },
  comments: [Object],
});

module.exports = mongoose.model(`Mountain`, mountainSchema);
