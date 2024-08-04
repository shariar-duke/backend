const express = require('express')
const router = express.Router() // router k import korlam 
const { setProfile, getProfile } = require("../controllers/profileController")
const authorize = require('../middlewares/authorize')


router.route("/").post(authorize, setProfile).get(authorize, getProfile)

module.exports = router;