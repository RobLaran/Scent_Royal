const userModel = require('../models/user.model');
const Product = require('../models/product.model');

module.exports = {
    async loginAsAdmin(req, res) {
        try {
            const { email, password } = req.body;

            const user = await userModel.getAdminByEmail(email);
            
            if (!user) {
                return res.status(401).render('pages/errors/401', { 
                    title: 'Unauthorized', 
                    message: 'Invalid credentials' 
                });
            } else if(user.password !== password) {
                return res.status(401).render('pages/errors/401', { 
                    title: 'Unauthorized', 
                    message: 'Wrong password' 
                });
            }

            // Store login in session
            req.session.user = user;
            req.session.isLoggedIn = true;

            // If admin
            if (user.isAdmin) {
                return res.redirect('/admin/dashboard');
            } else {
                // If normal user
                res.redirect('/');
            }
        } catch (err) {
            console.error('Error:', err);
            res.status(500).render('pages/errors/500', { 
                title: 'Internal Server Error', 
                message: 'Cannot Login as Admin' 
            });
        }
    },
    
    async logoutAdmin(req, res) {
        req.session.destroy(() => {
            res.redirect('/admin/login');
        });
    },

    async getProducts(req, res) {
        try {
            const products = await Product.getProducts();

            res.render('pages/admin/Products', { products: products, title: 'Product List' });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error: Cannot Show Products');
        }
    },

    async addProduct(req, res) {
        try {
            const { brand, title, type, category, available, currentPrice, itemLocation, image } = req.body;

            const newProduct = {
                brand, 
                title, 
                type, 
                category, 
                available, 
                currentPrice,
                itemLocation, 
                image: image.startsWith("http") ? image : "/img/" + image
            };

            await Product.add(newProduct);

            return res.redirect("/admin/add-product");
        } catch (err) {
            console.error("Error:", err.message);
            return res.redirect("/admin/add-product");
        }
    },

    async removeProduct(req, res) {
        try {
            const productId = await req.params.id;

            await Product.remove(productId);
            return res.json({
                message: "Product removed",
                success: true
            });
        } catch (err) {
            console.error("Error:", err.message);
            return res.status(500).json({
                message: `Internal Server Error: Cannot remove product`,
                success: false,
            });
        }
    }
};



