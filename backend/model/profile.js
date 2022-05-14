const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  phone: {
    type: String
  },
  address: {
    address: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zipcode: {
      type: String
    },
    country: {
      type: String
    }
  },
  website: {
    type: String
  },
  company: {
    type: String
  },
  timestamps: {}
})

module.exports = mongoose.model("Profile", profileSchema)
