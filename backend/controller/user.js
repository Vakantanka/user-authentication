const UserService = require("../service/user");
const jwt = require("jsonwebtoken");

function generateToken(_id) {
   return jwt.sign({ _id }, process.env.PRIVATE_KEY, { expiresIn: "1800s"});
}

const  apiSignIn = async (req, res, next) => {
   const authHeader = req.header("authorization");
   if (!authHeader) return res.sendStatus(401);
 
   const credential = authHeader.split(":::")[0];
   const password = authHeader.split(":::")[1];

   let option = {}
   if (credential.includes('@')) {
      option = { email: credential };
   } else {
      option = { username: credential };
   }
   try {
      const existingUser = await UserService.getAuthenticate(option, password);
      if (!existingUser) return res.sendStatus(403);
      if (!existingUser.verified) return res.sendStatus(402);
      const token = generateToken(existingUser._id);
      res.json({
         token: token
      });
   } catch (error) {
      res.status(500).json({error: error})
   }
}

const  apiSignUp = async (req, res, next) => {
   console.log(req.body);
   if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.email || !req.body.password) return res.sendStatus(401);

   const regexEmail = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/;
   const regexUsername = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
   if (req.body.firstName.length < 5) return res.sendStatus(403);
   if (!regexUsername.test(req.body.username)) return res.sendStatus(403);
   if (!regexEmail.test(req.body.email)) return res.sendStatus(403);
   if (req.body.password.length < 5) return res.sendStatus(403);

   let option = { $or: [{email: req.body.email}, {username: req.body.username}] };
   const existingUser = await UserService.getUserByData(option);
   console.log(existingUser);
   if (existingUser.length === 1) return res.sendStatus(409);

   const user = await UserService.saveUser(req.body);
   if (user) {
      res.sendStatus(200);
   } else {
      res.sendStatus(400);
   }
}

const apiFindUserByUsername = async (req, res, next) => {
   try {
      let username = req.body.username || {};
      let option = { username: username };
      const user = await UserService.getUserByCredential(option);
      if (user.length > 0) {
         res.sendStatus(204)
      } else {
         res.sendStatus(200)
      }
   } catch (error) {
      res.status(500).json({error: error})
   }
}

const apiFindUserByEmail = async (req, res, next) => {
   try {
      let email = req.body.email || {};
      let option = { email: email };
      const user = await UserService.getUserByCredential(option);
      if (user.length > 0) {
         res.sendStatus(204)
      } else {
         res.sendStatus(200)
      }
   } catch (error) {
      res.status(500).json({error: error})
   }
}

const apiFindAnotherUserByUsername = async (req, res, next) => {
   try {
      let username = req.body.username || {};
      let option = { username: username };
      const user = await UserService.getUserByCredential(option);
      if (user.length > 0) {
         if (req.user_id === user[0]._id.toString()) return res.sendStatus(200)
         res.sendStatus(204)
      } else {
         res.sendStatus(200)
      }
   } catch (error) {
      res.status(500).json({error: error})
   }
}

const apiFindAnotherUserByEmail = async (req, res, next) => {
   try {
      let email = req.body.email || {};
      let option = { email: email };
      const user = await UserService.getUserByCredential(option);
      if (user.length > 0) {
         if (req.user_id === user[0]._id.toString()) return res.sendStatus(200)
         res.sendStatus(204)
      } else {
         res.sendStatus(200)
      }
   } catch (error) {
      res.status(500).json({error: error})
   }
}

const  apiConfirm = async (req, res, next) => {
   if (!req.body.code) return res.sendStatus(401);
   console.log(req.body.code);
   try {
      const existingEntity = await UserService.getEntity(req.body.code);
      if (existingEntity.length === 1) return res.sendStatus(404);
      return res.sendStatus(200);
   } catch (error) {
      res.sendStatus(400);
   }
}

const  apiPasswordReset = async (req, res, next) => {
   if (!req.body.email) return res.sendStatus(401);

   const regexEmail = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/;
   if (!regexEmail.test(req.body.email)) return res.sendStatus(403);
   let option = { email: req.body.email };
   const user = await UserService.passwordReset(option);
   if (user) {
      res.sendStatus(200);
   } else {
      res.sendStatus(400);
   }
}

const  apiReset = async (req, res, next) => {
   if (!req.body.code || !req.body.password) return res.sendStatus(401);
   try {
      const existingReset = await UserService.getReset(req.body.code, req.body.password);
      if (!existingReset) return res.sendStatus(404);
      res.sendStatus(200);
   } catch (error) {
      res.sendStatus(400);
   }
}

const apiGetProfileData = async (req, res, next) => {
   try {
      const profile = await UserService.getProfileData(req.user_id)
      res.json(profile)
   } catch (error) {
      res.status(500).json({error: error})
   }
}

const apiUpdateAccount = async (req, res, next) => {
   console.log(req.body);
   if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.email) return res.sendStatus(401);

   const regexEmail = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/;
   const regexUsername = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
   if (req.body.firstName.length < 5) return res.sendStatus(403);
   if (!regexUsername.test(req.body.username)) return res.sendStatus(403);
   if (!regexEmail.test(req.body.email)) return res.sendStatus(403);

   // let option = { $or: [{email: req.body.email}, {username: req.body.username}] };
   // const existingUser = await UserService.getUserByData(option);
   // console.log(existingUser);
   // if (existingUser.length === 1) return res.sendStatus(409);

   const user = await UserService.updateUser(req.user_id,req.body);
   if (user) {
      res.sendStatus(200);
   } else {
      res.sendStatus(400);
   }
}


module.exports = { 
   apiSignIn, 
   apiSignUp, 
   apiFindUserByUsername, 
   apiFindUserByEmail, 
   apiConfirm, 
   apiPasswordReset, 
   apiReset,
   apiGetProfileData,
   apiFindAnotherUserByEmail,
   apiFindAnotherUserByUsername,
   apiUpdateAccount
}