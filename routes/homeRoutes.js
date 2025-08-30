const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.controller');
const { isUser } = require('../middleware/auth');

router.get('/', isUser,  homeController.showHome);

module.exports = router;
