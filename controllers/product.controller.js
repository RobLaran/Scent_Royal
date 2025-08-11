const Product = require('../models/product.model');

const title = 'Shop';

module.exports = {
    async showProducts(req, res) {
        try {
            const userId = req.session?.user?.id || null;
            const products = await Product.getProducts(userId);

            res.render('pages/Shop', { products: products, title: title });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error: Cannot Show Products');
        }
    },

    async showByBrand(req, res) {
        try {
            const userId = req.session?.user?.id || null;
            const products = await Product.getByBrand(userId, req.params.brand);
            res.render('pages/Shop', { products, title: req.params.brand });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error: Cannot Show Brands');
        }
    },

    async showByType(req, res) {
        try {
            const userId = req.session?.user?.id || null;
            const products = await Product.getByType(userId, req.params.type);
            res.render('pages/Shop', { products, title: req.params.type });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error: Cannot Show Types');
        }
    },

    async showByCategory(req, res) {
        try {
            const userId = req.session?.user?.id || null;
            const products = await Product.getByCategory(userId, req.params.category);
            res.render('pages/Shop', { products, title: req.params.category });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error: Cannot Show Categories');
        }
    },

    async showProduct(req, res) {
        try {
            const userId = req.session?.user?.id || null;
            const product = await Product.getById(userId, req.params.id);
            if (!product) {
                return res.status(404).render('pages/404', { 
                    title: 'Product Not Found', 
                    message: 'The product you are looking for does not exist.' 
                });
            }
            res.render('pages/Product', { 
                product, 
                title: product.title || 'Product Detail' 
            });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).render('pages/500', { 
                title: 'Internal Server Error', 
                message: 'Cannot Show Product' 
            });
        }
    }
};
