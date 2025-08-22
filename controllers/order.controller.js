const Order = require("../models/order.model");

const title = "Orders";

module.exports = {
    async getOrders(req, res) {
        try {
            const userId = req.session?.user?.id;
            const orders = await Order.getOrders(
                userId
            );

            res.render("pages/Orders", {
                title,
                orders
            });
        } catch (err) {
            res.status(500).send("Internal Server Error: " + err);
        }
    },

    async getOrder(req, res) {
        try {
            const userId = req.session?.user?.id;
            const orderId = req.params.order;
            const order = await Order.getOrder(
                orderId,
                req.session?.user?.id || null
            );
            const orderItems = order.items;

            if (!userId) {
                return res.status(404).render("pages/errors/404", {
                    title: "Page not found",
                    message: "You need to login",
                });
            }

            if (!orderItems || orderItems.length === 0) {
                return res.status(404).render("pages/errors/404", {
                    title: "Page not found",
                    message: "No order items found",
                });
            }

            res.render("pages/Order", {
                order: order,
                info: order.billing_info,
                items: orderItems,
                title: title,
            });
        } catch (err) {
            res.status(500).send("Internal Server Error: " + err);
        }
    },

    async removeOrder(req, res) {
        try {
            const userId = req.session?.user?.id;
            const orderId = req.params.id;

            if (!userId) {
                return res
                    .status(401)
                    .json({ message: "You must be logged in" });
            }

            await Order.remove(orderId, userId);
            return res.json({
                message: "Order removed",
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
