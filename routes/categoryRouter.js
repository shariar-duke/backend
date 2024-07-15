const express = require('express')
const router = express.Router() // router k import korlam 
const { createCategory, getCategories } = require('../controllers/categoryController')

const admin = require('../middlewares/admin')
const authorize = require('../middlewares/authorize')

// jode admin hoy and system a logged in thake tahle sudhu se category create korte parbe 

router.route('/').post([authorize, admin], createCategory).get(getCategories)

// jode category create korte chay tahle take admin r authorize middleware er modhe dia jaite hbe . r setar syntax ta emn [] er modhe dia .


module.exports = router