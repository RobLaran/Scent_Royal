const db = require("../config/database_connection");

module.exports = {
    async getProductById(productId, userId = null) {
        const safeUserId = userId || 0;

        const [results] = await db.query(
            `SELECT p.*,
                    EXISTS(SELECT 1 FROM wishlist w 
                        WHERE w.product_id = p.id AND w.user_id = ?) AS in_wishlist,
                    EXISTS(SELECT 1 FROM cart c 
                        WHERE c.product_id = p.id AND c.user_id = ?) AS in_cart
            FROM perfumes p
            WHERE p.id = ?`,
            [safeUserId, safeUserId, productId]
        );

        if (results.length === 0) return null; // no product found

        const product = results[0];
        return {
            ...product,
            in_wishlist: !!product.in_wishlist,
            in_cart: !!product.in_cart
        };
    },

    async getProducts(userId = null, query = "", params = []) {
        const safeUserId = userId || 0;

        if (query) {
            query = "WHERE " + query;
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

        return results.map((product) => ({
            ...product,
            in_wishlist: !!product.in_wishlist,
            in_cart: !!product.in_cart,
        }));
    },

    async getByBrand(userId, brand) {
        const query = "brand = ?";
        const params = [brand];
        const results = await this.getProducts(userId, query, params);
        return results;
    },

    async getByType(userId, type) {
        const query = "type = ?";
        const params = [type];
        const results = await this.getProducts(userId, query, params);
        return results;
    },

    async getByCategory(userId, category) {
        const query = "category = ?";
        const params = [category];
        const results = await this.getProducts(userId, query, params);
        return results;
    },

    async getById(userId, productId) {
        const query = "id = ?";
        const params = [productId];
        const results = await this.getProducts(userId, query, params);
        return results[0];
    },

    async add(newProduct) {
        // Insert new product
        const query =
            "INSERT INTO perfumes (brand, title, type, category, available, currentPrice, itemLocation, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const params = [
            newProduct.brand,
            newProduct.title,
            newProduct.type,
            newProduct.category,
            newProduct.available,
            newProduct.currentPrice,
            newProduct.itemLocation,
            newProduct.image
        ];

        await db.query(query, params);

        return {
            success: true,
            message: "Item added to Inventory successfully",
        };
    },
    
    async remove(productId) {
        await db.query(
            "DELETE FROM perfumes WHERE id = ?",
            [productId]
        );
    },

    async getNumberOfProducts() {
        const query = "SELECT DISTINCT COUNT(id) as count FROM perfumes";
        const params = [];
        const [ row ] = await db.query(query, params);
        return row[0].count;
    }
};
