const router = require('express').Router();
const ContentCtrl = require("../controller/content");

router.get("/:endpoint", ContentCtrl.apiGetContent);

module.exports = router

// const authJwt = require('../middleware/authJwt');
// router.get("/private", [authJwt.verifyToken], ContentCtrl.apiGetPrivateContent);
