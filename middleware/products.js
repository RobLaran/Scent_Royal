const db = require('../database_connection');

function fetchBrands(req, res, next) {
  const distinctBrands = 'SELECT * FROM perfumes ';

  db.query(distinctBrands, (err, result) => {
    if (err) return next(err);

    req.brands = result.map(row => row.brand);;

    next();
  });
}

module.exports = fetchBrands;