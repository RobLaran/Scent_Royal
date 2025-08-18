const express = require('express');
const router = express.Router();
const controller = require('../controllers/checkout.controller');

router.get('/', controller.showItems);

module.exports = router;
