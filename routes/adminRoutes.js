const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

function isAdminOnly(req, res, next) {
    if (!req.session.user.isAdmin) {
        return res.status(403).render('pages/errors/403', { 
            title: 'Forbidden', 
            message: 'You are not allowed to access this page.' 
        });
    }

    next();
}

router.get('/login', (req, res) => {
    res.render('pages/Admin', { title: 'Admin', user: req.session.user});

});
router.post('/login', adminController.loginAsAdmin);

router.get('/logout', adminController.logoutAdmin);

router.get('/dashboard', isAdminOnly, (req, res) => {
    res.render('pages/Dashboard', { title: 'Dashboard' });
});

router.get('/products', isAdminOnly, (req, res) => {
    res.render('pages/ProductList', { title: 'Products' });
});

module.exports = router;
