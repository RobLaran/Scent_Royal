const db = require("../config/database_connection");

module.exports = {
    async create({ userId, items, billing }) {
        const [result] = await db.query(
            "INSERT INTO orders (user_id, billing_info, created_at) VALUES (?, ?, CURDATE())",
            [userId, JSON.stringify(billing)]
        );

        const orderId = result.insertId;

        for (let item of items) {
            await db.query(
                "INSERT INTO order_items (order_id, product_id, title, quantity, price) VALUES (?, ?, ?, ?, ?)",
                [orderId, item.id, item.title, item.quantity, item.currentPrice]
            );
        }

        return orderId;
    },

    async getOrders(userId) {
        const query = "SELECT * FROM orders WHERE user_id = ?";
        const params = [userId];

        const [rows] = await db.query(query, params);

        if (rows.length === 0) {
            return [];
        }

        return await Promise.all(
            rows.map(async (row) => {
                const orderId = row.id;
                const items = await this.getOrderItems(orderId);

                return {
                    ...row,
                    items
                };
            })
        );
    },

    async getOrder(orderId, userId) {
        const [rows] = await db.query(
            "SELECT * FROM orders WHERE id = ? AND user_id = ?",
            [orderId, userId]
        );
        if (!rows.length) return null;

        const order = rows[0];
        const [items] = await db.query(
            "SELECT * FROM order_items WHERE order_id = ?",
            [orderId]
        );

        order.items = items;
        order.billing_info = JSON.parse(order.billing_info);
        return order;
    },

    async getOrderItems(orderId) {
        const [items] = await db.query(
            "SELECT * FROM order_items WHERE order_id = ?",
            [orderId]
        );

        return items;
    },
};
