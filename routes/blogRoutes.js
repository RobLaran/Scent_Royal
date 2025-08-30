const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');

router.get('/', blogController.showBlogs);
router.get('/:id', blogController.showBlog);

module.exports = router;
