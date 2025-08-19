const db = require("../config/database_connection");
const Product = require("./product.model");

module.exports = {
    async add(productId, userId) {
        // Check if already in cart
        const exists = await this.isInCart(productId, userId);
        if (exists) {
            throw new Error("Item already added to Cart");
        }

        // Insert new item
        const query =
            "INSERT INTO cart (product_id, user_id, quantity) VALUES (?, ?, 1)";
        const params = [productId, userId];

        const [results] = await db.query(query, params);

        return {
            success: true,
            message: "Item added to Cart successfully",
        };
    },

    async remove(productId, userId) {
        await db.query(
            "DELETE FROM cart WHERE product_id = ? AND user_id = ?",
            [productId, userId]
        );
    },

    async removeAll(userId) {
        await db.query(
            "DELETE FROM cart WHERE user_id = ?",
            [userId]
        );
    },

    async getItems(userId) {
        const query = "SELECT * FROM cart WHERE user_id = ?";
        const params = [userId];

        const [rows] = await db.query(query, params);

        if (rows.length === 0) {
            return [];
        }

        const items = await Promise.all(
            rows.map(async (row) => {
                const productId = row.product_id;
                const detail = await Product.getById(userId, productId);

                return {
                    itemId: row.id,
                    ...detail,
                    quantity: row.quantity,
                };
            })
        );

        return items;
    },

    async updateQuantity(itemId, userId, quantity) {
        const query =
            "UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?";
        const params = [quantity, itemId, userId];

        const [results] = await db.query(query, params);

        if (results.affectedRows === 0) {
            throw new Error("No cart item found to update");
        }

        return {
            success: true,
            message: "Quantity updated successfully",
        };
    },

    async isInCart(productId, userId) {
        const [[{ exists }]] = await db.query(
            "SELECT EXISTS(SELECT 1 FROM cart WHERE product_id = ? AND user_id = ?) AS `exists`",
            [productId, userId]
        );
        return !!exists;
    },

    async getNumberOfItems(userId) {
        const query =
            "SELECT COUNT(*) as `Items` FROM cart WHERE user_id = ?";
        const params = [userId];

        const [results] = await db.query(query, params);

        return results[0]['Items'];
    },

    async getSubTotal(userId) {
        const query = `
            SELECT SUM(cart.quantity * perfumes.currentPrice) AS total
            FROM cart
            JOIN perfumes ON cart.product_id = perfumes.id
            WHERE cart.user_id = ?
        `;
        const [results] = await db.query(query, [userId]);
        return results[0].total || 0; // return 0 if cart is empty
    }
};
