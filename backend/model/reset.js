const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resetSchema = Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  secretKey: {
    type: String,
    required: true
  },
  timestamps: {}
})

module.exports = reset = mongoose.model("Reset", resetSchema)
