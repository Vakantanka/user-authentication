const router = require('express').Router();
const UserCtrl = require("../controller/user");
const authJwt = require('../middleware/authJwt')

router.post("/signIn", UserCtrl.apiSignIn);
router.post("/signUp", UserCtrl.apiSignUp);
router.post("/findUserByUsername", UserCtrl.apiFindUserByUsername);
router.post("/findUserByEmail", UserCtrl.apiFindUserByEmail);
router.post("/confirm", UserCtrl.apiConfirm);
router.post("/passwordReset", UserCtrl.apiPasswordReset);
router.post("/reset", UserCtrl.apiReset);
router.get("/profile", [authJwt.verifyToken], UserCtrl.apiGetProfileData);

module.exports = router
