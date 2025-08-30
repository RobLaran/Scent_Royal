const express = require("express");
const { isUser } = require("../middleware/auth");
const router = express.Router();

router.use(require("../middleware/filters"));

router.use((req, res, next) => {
    res.locals.currentPath = req.path;
    res.locals.user = req.session?.user || null;
    res.locals.isAdmin = req.session?.user?.isAdmin || false;
    res.locals.isLoggedIn = req.session?.isLoggedIn || false;
    next();
});

router.use('/', require('./homeRoutes'))

router.use("/shop", isUser, require("./productRoutes"));

router.use("/blog", isUser, require("./blogRoutes"));

router.use("/wishlist", isUser, require("./wishlistRoutes"));

router.use("/cart", isUser, require("./cartRoutes"));

router.use("/checkout", isUser, require("./checkoutRoutes"));

router.use("/orders", isUser, require("./orderRoutes"));

router.use("/admin", require("./adminRoutes"));

router.use("/user", isUser, require("./userRoutes"));

router.get("/about", isUser, (req, res) => {
    res.render("pages/About", { title: "About" });
});

router.get("/contact", isUser, (req, res) => {
    res.render("pages/Contact", { title: "Contact" });
});

router.use((req, res) => {
    res.status(404).render("pages/errors/404", {
        title: "Page Not Found",
        message: "The page you are looking for does not exist.",
        isError: true,
    });
});

module.exports = router;
