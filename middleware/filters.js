const db = require('../database_connection');

function fetchFilters(req, res, next) {
  const brandsQuery = 'SELECT DISTINCT brand FROM perfumes';
  const typesQuery = 'SELECT DISTINCT type FROM perfumes';
  const categoriesQuery = 'SELECT DISTINCT category FROM perfumes';

  db.query(brandsQuery, (err, brands) => {
    if (err) return next(err);
    db.query(typesQuery, (err, types) => {
      if (err) return next(err);
      db.query(categoriesQuery, (err, categories) => {
        if (err) return next(err);

        // Store in res.locals (EJS has direct access)
        res.locals.brands = brands.map(row => row.brand);
        res.locals.categories = categories.map(row => row.category);
        res.locals.types = types.map(row => row.type);

        next();
      });
    });
  });
}

module.exports = fetchFilters;