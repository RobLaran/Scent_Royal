const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');

router.get('/blog', blogController.showBlogs);
router.get('/blog/:id', blogController.showBlog);

module.exports = router;
