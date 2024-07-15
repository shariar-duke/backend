const express = require('express')
const router = express.Router() // router k import korlam 
const admin = require('../middlewares/admin')
const authorize = require('../middlewares/authorize')
const { createProduct, getProducts, getProductById, updateProductById } = require('../controllers/productController')


router.route('/').post([authorize, admin], createProduct).get(getProducts) // ei duta base url a hbe 

// single prouct pawar jnno and single product update er jnno of course ekta single id send korte hbe seta ami kortse ekhn

router.route('/:id').get(getProductById).put(updateProductById)

module.exports = router