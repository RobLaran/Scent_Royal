const db = require('../config/database_connection');
const Product = require('./product.model');

function getCurrentDate() {
    const currentDate = new Date().toISOString().split('T')[0];
    return currentDate;
}

module.exports = {
    async getWishlistByUserId(userId) {
        const [rows] = await db.query('SELECT * FROM wishlist WHERE user_id = ?', [userId]);

        const products = await Promise.all(
            rows.map(async (row) => {
                const detail = await Product.getById(userId,id=row.product_id);

                return {
                    ...detail,
                    date_added: new Date(row.date_added).toISOString().split('T')[0]
                };
            })
        );

        return products;
    },

    async addToWishlist(productId, userId, dateAdded=getCurrentDate()) {
        const exist = await this.isInWishlist(productId, userId);

        if(!!exist) {
            return;
        }

        await db.query(
            "INSERT INTO `wishlist`(`product_id`, `user_id`, `date_added`) VALUES (?,?,?)",
            [productId, userId, dateAdded]
        );
    },

    async removeFromWishlist(productId, userId) {
        await db.query(
            'DELETE FROM wishlist WHERE product_id = ? AND user_id = ?',
            [productId, userId]
        );
    },

    async removeAllFromWishlist(userId) {
        await db.query(
            'DELETE FROM wishlist WHERE user_id = ?',
            [userId]
        );
    },

    async updateProductInWishlist(updatedFields=[], productId, userId) {

    },

    async isInWishlist(productId, userId) {
        const [[{ exists }]] = await db.query(
            'SELECT EXISTS(SELECT 1 FROM wishlist WHERE product_id = ? AND user_id = ?) AS `exists`',
            [productId, userId]
        );
        return !!exists;
    }
}