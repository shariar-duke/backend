const router = require('express').Router();
const {
    getProducts,
    createProduct,
    getProductById,
    updateProductById,
    filterProducts,
    getPhoto
} = require('../controllers/productController');
const admin = require('../middlewares/admin');
const authorize = require('../middlewares/authorize');

router.route('/')
    .post([authorize, admin], createProduct)
    .get(getProducts);

router.route('/:id')
    .get(getProductById)
    .put([authorize, admin], updateProductById);

router.route('/photo/:id')
    .get(getPhoto);

router.route('/filter').post(filterProducts)

module.exports = router;