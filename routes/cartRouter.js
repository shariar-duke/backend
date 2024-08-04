const express = require('express')
const router = express.Router()
const { createCartItem, getCartItem, updateCartItem, deleteCartItem } = require("../controllers/cartController")

// authorize function a import korte hbe karon j gula operation korbe se obossoi authrize use hbe ekjon 
const authorize = require('../middlewares/authorize');

router.route('/').get([authorize], getCartItem).post([authorize], createCartItem).put([authorize], updateCartItem)

// delete er jnno route ta hbe 

router.route('/:id').delete([authorize], deleteCartItem)


module.exports = router;
