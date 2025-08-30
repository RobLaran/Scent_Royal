const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { isAdminOnly } = require('../middleware/auth');

router.get('/login', (req, res) => {
    res.render('pages/Admin', { title: 'Admin', user: req.session.user});

});
router.post('/login', adminController.loginAsAdmin);

router.get('/logout', adminController.logoutAdmin);

router.get('/add-product', isAdminOnly, (req, res) => {
    res.render('pages/admin/AddProduct', { title: 'Add Product' });
});

router.post('/add-product', isAdminOnly, adminController.addProduct);


router.delete('/products/:id', isAdminOnly, adminController.removeProduct)
router.get('/products', isAdminOnly, adminController.getProducts);

router.get('/orders', isAdminOnly, adminController.getOrders);

module.exports = router;
