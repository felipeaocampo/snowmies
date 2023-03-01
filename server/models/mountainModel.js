const mongoose = require(`mongoose`);

const mountainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  closestCity: {
    type: String,
    required: true,
  },
  mountainComments: [Object],
});

module.exports = mongoose.model(`Mountain`, mountainSchema);
