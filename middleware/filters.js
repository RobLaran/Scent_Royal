const db = require('../config/database_connection'); // assuming db = pool.promise()

const fetchFilters = async (req, res, next) => {
  try {
    const [brands] = await db.query('SELECT DISTINCT brand FROM perfumes');
    const [categories] = await db.query('SELECT DISTINCT category FROM perfumes');
    const [types] = await db.query('SELECT DISTINCT type FROM perfumes');

    res.locals.brands = brands.map((row) =>  row.brand );
    res.locals.categories = categories.map((row) =>  row.category );
    res.locals.types = types.map((row) =>  row.type );

    next();
  } catch (err) {
    console.error('Error fetching filter data:', err);
    res.status(500).send('Server Error');
  }
};

module.exports = fetchFilters;
