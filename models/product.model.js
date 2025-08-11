const db = require('../config/database_connection');

module.exports = {
   async getProducts(userId=null,query='',params=[]) {
        const safeUserId = userId || 0;

        if (query) {
            query = 'WHERE ' + query; 
        }

        const [results] = await db.query(
            `SELECT p.*,
                    EXISTS(SELECT 1 FROM wishlist w 
                        WHERE w.product_id = p.id AND w.user_id = ?) AS in_wishlist,
                    EXISTS(SELECT 1 FROM cart c 
                        WHERE c.product_id = p.id AND c.user_id = ?) AS in_cart
            FROM perfumes p
            ${query}`,
            [safeUserId, safeUserId, ...params]
        );

        return results.map(product => ({
            ...product,
            in_wishlist: !!product.in_wishlist,
            in_cart: !!product.in_cart
        }));
    },

    async getByBrand(userId, brand) {
        const query = 'brand = ?';
        const params = [brand];
        const results = await this.getProducts(userId,query,params);
        return results;
    },

    async getByType(userId, type) {
        const query = 'type = ?';
        const params = [type];
        const results = await this.getProducts(userId,query,params);
        return results;
    },

    async getByCategory(userId, category) {
        const query = 'category = ?';
        const params = [category];
        const results = await this.getProducts(userId,query,params);
        return results;
    },

    async getById(userId, id) {
        const query = 'id = ?';
        const params = [id];
        const results = await this.getProducts(userId,query,params);
        return results[0];
    }
};
