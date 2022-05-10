const User = require("../model/User");
const authEntity = require("../model/authEntity");
const Reset = require("../model/Reset");
const nodemailer = require("nodemailer");
const crypto = require('crypto');

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_KEY,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

const getUserByUserName = async (option) => {
  try {
    const allUsers = await User.find(option);
    return allUsers;
  } catch (error) {
    console.log(`Could not fetch users ${error}`)
  }
}

const getUserByData = async (option) => {
  try {
    const existingUser = await User.find(option);
    return existingUser;
  } catch (error) {
    console.log(`Could not fetch users ${error}`)
  }
}

const saveUser = async (userdata) => {
  try {
    const user = new User(userdata);
    const newUser = await user.save();  
    const entity = new authEntity({userId: newUser._id, secretKey: crypto.randomBytes(256).toString('hex')});
    const newEntity = await entity.save();
    const mail = {
      from: process.env.MAIL,
      to: newUser.email,
      subject: "Registration message",
      html: `
      <p>Dear ${newUser.firstName}!</p>
      <p>You are registered our site with your email: ${newUser.email}</p>
      <p>Please follow this link, to confirm your registration: <a href="http://localhost:3000/confirm?code=${newEntity.secretKey}">follow this link</a></p>
      <p>Thank you!</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        console.log("E-mail error");
      }
    });

    return newUser;
  } catch (error) {
    console.log(`Could not save user ${error}`)
  }
}

const getUserByCredential = async (option) => {
  try {
    const singleUser = await User.find(option);
    return singleUser;
  } catch (error) {
    console.log(`Could not fetch user ${error}`)
  }
}

const getAuthenticate = async (option, password) => {
  try {
    const user = await User.findOne(option);
    if (user) {
      const match = await user.comparePassword(password);
      if (match) {
        return user;
      }
    }
  } catch (error) {
    console.log(`Could not fetch user ${error}`)
  }
}

const getEntity = async (code) => {
  try {
    const entity = await authEntity.findOne({secretKey: code});
    const match = await User.findByIdAndUpdate(entity.userId, { verified: true });
    return match;
  } catch (error) {
    console.log(`Could not fetch entity ${error}`)
  }
}

const passwordReset = async (userdata) => {
  try {
    const user = await User.findOne(userdata);
    const reset = new Reset({userId: user._id, secretKey: crypto.randomBytes(256).toString('hex')});
    const newReset = await reset.save();

    const mail = {
      from: process.env.MAIL,
      to: user.email,
      subject: "Reset password message",
      html: `
      <p>Dear ${user.firstName}!</p>
      <p>You have sent a password reset message.</p>
      <p>Please follow this link, to create new password: <a href="http://localhost:3000/reset?code=${newReset.secretKey}">reset password</a></p>
      <p>Thank you!</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        console.log("E-mail error");
      }
    });

    return newReset;
  } catch (error) {
    console.log(`Could not fetch entity ${error}`)
  }
}

const getReset = async (code, password) => {
  try {
    const reset = await Reset.findOne({secretKey: code});
    const user = await User.findById(reset.userId);
    user.password = password;
    await user.save();
    return user;
  } catch (error) {
    console.log(`Could not fetch entity ${error}`)
  }
}


module.exports = { getUserByUserName, getUserByData, saveUser, getUserByCredential, getAuthenticate, getEntity, passwordReset, getReset }