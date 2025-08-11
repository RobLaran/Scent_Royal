const Product = require('../models/product.model');


module.exports = {
  async showHome(req, res) {
    try {
      const userId = req.session?.user?.id || null;
      const featureds = await Product.getProducts(userId,'brand = ?',['CHANEL']);
      const bests = await Product.getProducts(userId,'category = ? LIMIT 6',['Women']);
      const specials = await Product.getProducts(userId,'id = 6');

      res.render('pages/Home', {
        featureds,
        bests,
        special: specials[0] || null,
        title: 'Home'
      });
    } catch (err) {
      console.error('Error loading home data:', err);
      res.status(500).send('Internal Server Error');
    }
  }
};
