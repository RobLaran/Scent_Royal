const Cart = require("../models/cart.model");
const Order = require('../models/order.model');

const title = "Checkout";

module.exports = {
    async showItems(req, res) {
        try {
            const userId = req.session?.user?.id;
            const cartItems = await Cart.getItems(req.session?.user?.id || null);

            if (!userId) {
                return res.status(404).render("pages/errors/404", {
                    title: "Page not found",
                    message: "You need to login",
                });
            }

            if(!cartItems || cartItems.length === 0) {
                return res.status(404).render("pages/errors/404", {
                    title: "Page not found",
                    message: "Your cart is empty",
                });
            }

            res.render("pages/Checkout", { items: cartItems, title: title, required: '' });
        } catch (err) {
            console.error("Error:", err);
            res.status(500).send("Internal Server Error: Cannot Show Items");
        }
    },

    async processOrder(req, res) {
        try {
            const userId = req.session?.user?.id;
            const billingInfo = req.body;
            const cartItems = await Cart.getItems(userId);
            
            if (!userId) {
                return res.status(404).render("pages/errors/404", {
                    title: "Page not found",
                    message: "You need to login",
                });
            }
            
            if(!cartItems || cartItems.length === 0) {
                return res.status(404).render("pages/errors/404", {
                    title: "Page not found",
                    message: "Your cart is empty",
                });
            }
            
            const orderId = await Order.create({ userId, items: cartItems, billing: billingInfo });
            // await Cart.removeAll(userId);

            res.redirect(`/order/${orderId}`);
        } catch (err) {
            res.status(500).send("Internal Server Error: " + err);
        }  
    },

    async placeOrder(req, res) {
        try {
            const userId = req.session?.user?.id;
            const orderNumber = req.query.order;
            const cartItems = await Cart.getItems(req.session?.user?.id || null);

            if (!userId) {
                return res.status(404).render("pages/errors/404", {
                    title: "Page not found",
                    message: "You need to login",
                });
            }

            if (!orderNumber) {
                return res.status(404).render("pages/errors/404", {
                    title: "Page not found",
                    message: "You did not place your order yet",
                });
            }


            res.render("pages/Order", { title: 'Order Received', items: cartItems });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).render('pages/errors/500', { 
                title: 'Internal Server Error', 
                message: 'Cannot Place Order' 
            });
        }
    },
};
