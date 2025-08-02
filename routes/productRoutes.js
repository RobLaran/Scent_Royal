const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const homeController = require('../controllers/home.controller');

router.get('/', homeController.showHome);
router.get('/shop', productController.showProducts);
router.get('/shop/brand/:brand', productController.showByBrand);
router.get('/shop/type/:type', productController.showByType);
router.get('/shop/category/:category', productController.showByCategory);
router.get('/shop/product/:id', productController.showProduct);

module.exports = router;
