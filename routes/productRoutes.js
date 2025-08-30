const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/', productController.showProducts);
router.get('/brand/:brand', productController.showByBrand);
router.get('/type/:type', productController.showByType);
router.get('/category/:category', productController.showByCategory);
router.get('/product/:id', productController.showProduct);

module.exports = router;
