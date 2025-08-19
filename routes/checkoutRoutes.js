const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkout.controller');

router.get('/', checkoutController.showItems);
router.post('/', checkoutController.processOrder);
router.get('/order', checkoutController.placeOrder);

module.exports = router;
