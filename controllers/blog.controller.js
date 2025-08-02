const Blog = require('../models/blog.model');

const title = 'Blog';

module.exports = {
    async showBlogs(req, res) {
        try {
            const blogs = await Blog.getBlogs();
            res.render('pages/Blog', { blogs: blogs, title: title });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error: Cannot Show Blogs');
        }
    }
};
