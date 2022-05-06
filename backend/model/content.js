const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GRANTS = [ "public", "private", "restricted" ]

const contentSchema = Schema({
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  endpoint: {
    type: String,
    required: true
  },
  grant: {
    type: String,
    required: true,
    enum: GRANTS
  },
  timestamps: {}
});

module.exports = Content = mongoose.model("Content", contentSchema)
