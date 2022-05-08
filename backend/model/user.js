const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = Schema({
  name: {
    type: String
  },
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  verified: {
    type: Boolean,
    default: false
  },
  timestamps: {}
})

userSchema.pre('save', function(next) {
  let user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword) {
  const match = bcrypt.compare(candidatePassword, this.password);
  return match;
}

module.exports = mongoose.model("User", userSchema)
