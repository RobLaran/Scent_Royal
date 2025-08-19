const Cart = require("../models/cart.model");

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

            res.render("pages/Checkout", { items: cartItems, title: title });
        } catch (err) {
            console.error("Error:", err);
            res.status(500).send("Internal Server Error: Cannot Show Items");
        }
    },

    async processOrder(req, res) {
        try {
            const userId = req.session?.user?.id;
            const confirmation = true;

            if (!userId) {
                return res.status(404).render("pages/errors/404", {
                    title: "Page not found",
                    message: "You need to login",
                });
            }

            const cartItems = await Cart.getItems(userId);

            if(!cartItems || cartItems.length === 0) {
                return res.status(404).render("pages/errors/404", {
                    title: "Page not found",
                    message: "Your cart is empty",
                });
            }
            
            res.redirect(`/checkout/order?confirmation=${confirmation}`);
        } catch (err) {
            console.error("Error:", err);
            res.status(500).send("Internal Server Error: Cannot Process Order");
        }  
    },

    async placeOrder(req, res) {
        try {
            const userId = req.session?.user?.id;
            const orderConfirmation = req.query.confirmation;
            const cartItems = await Cart.getItems(req.session?.user?.id || null);

            if (!userId) {
                return res.status(404).render("pages/errors/404", {
                    title: "Page not found",
                    message: "You need to login",
                });
            }

            if (!orderConfirmation) {
                return res.status(404).render("pages/errors/404", {
                    title: "Page not found",
                    message: "You did not place your order yet",
                });
            }

            res.render("pages/Order", { title: 'Order Received', items: cartItems });
        } catch (err) {
            console.error("Error:", err);
            res.status(500).send("Internal Server Error: Cannot Place Order");
        }
    },
};
