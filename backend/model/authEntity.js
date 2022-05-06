const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authEntitySchema = Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  secretKey: {
    type: String,
    required: true
  },
  timestamps: {}
})

module.exports = authEntity = mongoose.model("AuthEntity", authEntitySchema)
