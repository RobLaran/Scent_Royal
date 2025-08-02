const db = require('../database_connection');

function fetchCategories(req, res, next) {
  const distinctCategories = 'SELECT DISTINCT category FROM perfumes ';

  db.query(distinctCategories, (err, result) => {
    if (err) return next(err);

    req.categories = result.map(row => row.category);;

    next();
  });
}

module.exports = fetchCategories;