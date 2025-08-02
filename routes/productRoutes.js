const express = require('express');
const router = express.Router();
const db = require('../database_connection');

// Display products from the database
router.get('/shop', (req, res) => {
  const query = 'SELECT * FROM perfumes'; // Table must exist in your DB

  db.query(query, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send('Internal Server Error');
    }

    res.render('pages/Shop', { products: results, title: 'Shop'});
  });
});

router.get('/shop/brand/:brand', (req, res) => {
  const query = 'SELECT * FROM perfumes WHERE brand = ?'; // Table must exist in your DB
  const brand = req.params.brand;

  db.query(query, [brand], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send('Internal Server Error');
    }

    res.render('pages/Shop', { products: results, title: req.params.brand});
  });
});

router.get('/shop/type/:type', (req, res) => {
  const query = 'SELECT * FROM perfumes WHERE type = ?'; // Table must exist in your DB
  const type = req.params.type;

  db.query(query, [type], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send('Internal Server Error');
    }

    res.render('pages/Shop', { products: results, title: req.params.type});
  });
});

router.get('/shop/category/:category', (req, res) => {
  const query = 'SELECT * FROM perfumes WHERE category = ?'; // Table must exist in your DB

  const category = req.params.category;

  db.query(query, [category], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send('Internal Server Error');
    }

    res.render('pages/Shop', { products: results, title: req.params.category});
  });
});

router.get('/shop/product/:id', (req, res) => {
  const productId = req.params.id;
  const query = 'SELECT * FROM perfumes WHERE id = ?';

  db.query(query, [productId], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send('Internal Server Error');
    }

    if (results.length === 0) {
      return res.status(404).send('Product not found');
    }

    const product = results[0];

    res.render('pages/Product', { product, title: product.title || 'Product Detail' });
  });
});

// Featured Products
router.get('/', (req, res) => {
  const featuredsQuery = 'SELECT * FROM perfumes WHERE brand = ?';
  const sellersQuery = 'SELECT * FROM perfumes WHERE category = ? LIMIT 6';
  const specialQuery = 'SELECT * FROM perfumes WHERE id = 6';

  db.query(featuredsQuery, ['CHANEL'], (err, featureds) => {
    if (err) {
      console.error('Error fetching featureds:', err);
      return res.status(500).send('Internal Server Error');
    }

    db.query(sellersQuery, ['Women'], (err, bests) => {
      if (err) {
        console.error('Error fetching sellers:', err);
        return res.status(500).send('Internal Server Error');
      }

      db.query(specialQuery, (err, specialResult) => {
        if (err) {
          console.error('Error fetching special product:', err);
          return res.status(500).send('Internal Server Error');
        }

        const special = specialResult[0] || null;

        res.render('pages/Home', {
          featureds,
          bests,
          special,
          title: 'Home'
        });
      });
    });
  });
});


module.exports = router;
