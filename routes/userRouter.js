// ekhne amra user model er jnno necessary route gula define korbo 
const express = require('express')
const router = express.Router() // router k import korlam 
const { signIn, signUp } = require('../controllers/userController')

router.route('/signup').post(signUp)
router.route('/signin').post(signIn)

// A POST request to /signup will trigger the signUp function.
// A POST request to /signin will trigger the signIn function.

module.exports = router