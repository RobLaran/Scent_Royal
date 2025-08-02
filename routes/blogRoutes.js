const express = require('express');
const router = express.Router();
const db = require('../database_connection');

router.get('/blog', (req, res) => {
  const query = 'SELECT * FROM blogs WHERE id != 1'; // Table must exist in your DB

  db.query(query, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send('Internal Server Error');
    }

    res.render('pages/Blog', { blogs: results, title: 'Blog'});
  });
});

router.get('/blog/:id', (req, res) => {
  const query = 'SELECT * FROM blogs WHERE id = ?'; // Table must exist in your DB
  const blog_id = req.params.id;

  db.query(query, [blog_id], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send('Internal Server Error');
    }

    const blog = result[0];

    res.render('pages/BlogView', { blog: blog, title: blog.brand});
  });
});

module.exports = router;
