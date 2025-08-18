const Cart = require("../models/cart.model");

const title = "Checkout";

module.exports = {
    async showItems(req, res) {
        try {
            const userId = req.session?.user?.id;
            const items = await Cart.getItems(req.session?.user?.id || null);

            if(!userId) {
                return res.status(404).render('pages/errors/404', { 
                    title: 'Page not found', 
                    message: 'You need to login' 
                });
            }

            res.render("pages/Checkout", { items: items, title: title });
        } catch (err) {
            console.error("Error:", err);
            res.status(500).send("Internal Server Error: Cannot Show Items");
        }
    },
};
