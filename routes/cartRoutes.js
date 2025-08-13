const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");

router.get("/", cartController.showItems);
router.post("/add/:id", cartController.addToCart);
router.delete("/remove/:id", cartController.removeFromCart);
router.patch("/update/:id/:quantity", cartController.updateQuantity);

module.exports = router;
