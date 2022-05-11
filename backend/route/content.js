const router = require('express').Router()
const ContentCtrl = require("../controller/content")
const authJwt = require('../middleware/authJwt')

router.get("/:endpoint", ContentCtrl.apiGetContent)
router.post("/callRestrictedFunction", [authJwt.verifyToken], ContentCtrl.apiCallRestrictedFunction)
// router.post("/callRestrictedFunction", ContentCtrl.apiCallRestrictedFunction)

module.exports = router
