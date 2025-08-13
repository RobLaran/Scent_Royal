const express = require("express");
const router = express.Router();

router.use(require("../middleware/filters"));

router.use((req, res, next) => {
    res.locals.currentPath = req.path;
    res.locals.user = req.session?.user || null;
    res.locals.isAdmin = req.session?.user?.isAdmin || false;
    res.locals.isLoggedIn = req.session?.isLoggedIn || false;
    next();
});

router.use("/", require("./productRoutes"));

router.use("/", require("./blogRoutes"));

router.use("/wishlist", require("./wishlistRoutes"));

router.use("/cart", require("./cartRoutes"));

router.use("/admin", require("./adminRoutes"));

router.use("/user", require("./userRoutes"));

router.get("/about", (req, res) => {
    res.render("pages/About", { title: "About" });
});

router.get("/contact", (req, res) => {
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
