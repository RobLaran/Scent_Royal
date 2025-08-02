const Product = require('../models/product.model');

const title = 'Shop';

module.exports = {
    async showProducts(req, res) {
        try {
            const products = await Product.getProducts();
            res.render('pages/Shop', { products: products, title: title });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error: Cannot Show Products');
        }
    },

    async showByBrand(req, res) {
        try {
            const products = await Product.getByBrand(req.params.brand);
            res.render('pages/Shop', { products, title: req.params.brand });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error: Cannot Show Brands');
        }
    },

    async showByType(req, res) {
        try {
            const products = await Product.getByType(req.params.type);
            res.render('pages/Shop', { products, title: req.params.type });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error: Cannot Show Types');
        }
    },

    async showByCategory(req, res) {
        try {
            const products = await Product.getByCategory(req.params.category);
            res.render('pages/Shop', { products, title: req.params.category });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error: Cannot Show Categories');
        }
    },

    async showProduct(req, res) {
        try {
            const product = await Product.getById(req.params.id);
            if (!product) return res.status(404).send('Product not found');
            res.render('pages/Product', { product, title: product.title || 'Product Detail' });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error: Cannot Show Product');
        }
    }
};
