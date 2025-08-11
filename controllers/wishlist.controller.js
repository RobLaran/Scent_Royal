const Wishlist = require('../models/wishlist.model');

const title = 'Wishlist';

module.exports = {
    async getList(req, res) {
        try {
            const products = await Wishlist.getWishlistByUserId(req.session?.user?.id || null);
            res.render('pages/Wishlist', { products: products, title: title });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error: Cannot Show Products');
        }
    }, 

    async add(req, res) {
        try {
            const userId = req.session?.user?.id;
            const productId = req.params.productId;

            if (!userId) {
                return res.status(401).json({ message: 'You must be logged in' });
            }

            await Wishlist.addToWishlist(productId, userId);
            return res.json({ message: 'Product added', success: true, productId });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ message: 'Internal Server Error: Cannot add product', success: false });
        }
    },

    async remove(req, res) {
        try {
            const userId = req.session?.user?.id;
            const productId = req.params.productId;

            if (!userId) {
                return res.status(401).json({ message: 'You must be logged in' });
            }

            await Wishlist.removeFromWishlist(productId, userId);
            return res.json({ message: 'Product removed', success: true, productId });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ message: 'Internal Server Error: Cannot remove product', success: false });
        }
    },

    async removeAll(req, res) {
        try {
            const userId = req.session?.user?.id;

            if (!userId) {
                return res.status(401).json({ message: 'You must be logged in' });
            }

            await Wishlist.removeAllFromWishlist(userId);
            return res.json({ message: 'All products removed', success: true });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ message: 'Internal Server Error: Cannot remove all products', success: false });
        }
    },

    async toggleWishlist(req, res) {
        try {
            const userId = req.session?.user?.id;
            const productId = req.body.productId;

            if (!userId) {
                return res.status(401).json({ message: 'You must be logged in' });
            }

            const isInWishlist = await Wishlist.isInWishlist(productId, userId);

            if (isInWishlist) {
                await Wishlist.removeFromWishlist(productId, userId);
                return res.json({ message: 'Removed from wishlist', in_wishlist: false });
            } else {
                await Wishlist.addToWishlist(productId, userId);
                return res.json({ message: 'Added to wishlist', in_wishlist: true });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }


}