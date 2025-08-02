const express = require('express');
const router = express.Router();

const fetchFilters = require('../middleware/filters');
const productRoutes = require('./productRoutes');
const blogRoutes = require('./blogRoutes');

router.use(fetchFilters);

router.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

router.use('/', productRoutes);

router.use('/', blogRoutes);

router.get('/about', (req, res) => {
  res.render('pages/About', { title: 'About' });
});

router.get('/contact', (req, res) => {
  res.render('pages/Contact', { title: 'Contact' });
});

router.get('/wishlist', (req, res) => {
  res.render('pages/Wishlist', { title: 'Wishlist' });
});

router.get('/cart', (req, res) => {
  res.render('pages/Cart', { title: 'Shopping Cart' });
});

router.get('/login', (req, res) => {
  res.render('pages/Login', { title: 'Login' });
});

router.get('/register', (req, res) => {
  res.render('pages/Register', { title: 'Register' });
});

module.exports = router;