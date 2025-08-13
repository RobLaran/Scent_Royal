const Cart = require("../models/cart.model");

const title = "Shopping Cart";

module.exports = {
    async showItems(req, res) {
        try {
            const items = await Cart.getItems(req.session?.user?.id || null);

            console.log(items);

            res.render("pages/Cart", { items: items, title: title });
        } catch (err) {
            console.error("Error:", err);
            res.status(500).send("Internal Server Error: Cannot Show Items");
        }
    },

    async addToCart(req, res) {
        try {
            const userId = req.session?.user?.id;
            const productId = req.params.id;
            const totalItems = await Cart.getNumberOfItems(userId);
            const subTotal = await Cart.getSubTotal(userId);

            if (!userId) {
                return res
                    .status(401)
                    .json({ success: false, message: "You must be logged in" });
            }

            await Cart.add(productId, userId);
            return res.json({
                message: "Product added",
                success: true,
                totalItems,
                subTotal
            });
        } catch (err) {
            console.error("Error:", err.message);
            return res.status(500).json({
                message: `Internal Server Error: Cannot add product`,
                success: false,
            });
        }
    },

    async removeFromCart(req, res) {
        try {
            const userId = req.session?.user?.id;
            const productId = req.params.id;

            if (!userId) {
                return res
                    .status(401)
                    .json({ message: "You must be logged in" });
            }

            await Cart.remove(productId, userId);
            return res.json({
                message: "Product removed",
                success: true
            });
        } catch (err) {
            console.error("Error:", err.message);
            return res.status(500).json({
                message: `Internal Server Error: Cannot remove product`,
                success: false,
            });
        }
    },

    async updateQuantity(req, res) {
        try {
            const userId = req.session?.user?.id;
            const itemId = req.params.id;
            const quantity = req.params.quantity;

            if (!userId) {
                return res
                    .status(401)
                    .json({ message: "You must be logged in" });
            }

            await Cart.updateQuantity(itemId, userId, quantity);
            return res.json({
                message: "Item updated",
                success: true
            });
        } catch (err) {
            console.error("Error:", err.message);
            return res.status(500).json({
                message: `Internal Server Error: Cannot update item`,
                success: false,
            });
        }
    }
};
