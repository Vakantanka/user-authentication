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
router.post("/findAnotherUserByUsername", [authJwt.verifyToken], UserCtrl.apiFindAnotherUserByUsername);
router.post("/findAnotherUserByEmail", [authJwt.verifyToken], UserCtrl.apiFindAnotherUserByEmail);
router.post("/updateAccount", [authJwt.verifyToken], UserCtrl.apiUpdateAccount);
router.post("/updateAddress", [authJwt.verifyToken], UserCtrl.apiUpdateAddress);

module.exports = router
