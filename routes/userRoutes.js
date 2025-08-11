const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/login', (req, res) => {
    res.render('pages/Login', { title: 'Login'});
});

router.post('/login', userController.login);

router.post('/register', userController.register);

router.get('/logout', userController.logout);

module.exports = router;
