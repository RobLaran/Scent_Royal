const Order = require("../models/order.model");
const Product = require("../models/product.model")

const title = "Order Received";

module.exports = {
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

            console.log(orderItems);
            

            res.render("pages/Order", {
                order: order,
                info: order.billing_info,
                items: orderItems,
                title: title
            });
        } catch (err) {
            res.status(500).send("Internal Server Error: " + err);
        }
    },
};
