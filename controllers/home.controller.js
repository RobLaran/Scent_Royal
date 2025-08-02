const db = require('../config/database_connection');

module.exports = {
  async showHome(req, res) {
    try {
      const [featureds] = await db.query('SELECT * FROM perfumes WHERE brand = ?', ['CHANEL']);
      const [bests] = await db.query('SELECT * FROM perfumes WHERE category = ? LIMIT 6', ['Women']);
      const [specials] = await db.query('SELECT * FROM perfumes WHERE id = 6');

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
