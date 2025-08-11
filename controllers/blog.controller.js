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
    },
    async showBlog(req, res) {
        try {
            const blog = await Blog.getBlogById(req.params.id);
            if (!blog) {
                return res.status(404).render('pages/404', { 
                    title: 'Blog Not Found', 
                    message: 'The blog you are looking for does not exist.' 
                });
            }
            res.render('pages/BlogView', { 
                blog, 
                title: blog.title || 'Blog Detail' 
            });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).render('pages/500', { 
                title: 'Internal Server Error', 
                message: 'Cannot Show Blog' 
            });
        }
    }

};
