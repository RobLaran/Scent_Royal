// const db = require('../config/database_connection'); // assuming db = pool.promise()

// const fetchFilters = async (req, res, next) => {
//   try {
//     const [brands] = await db.query('SELECT DISTINCT brand FROM perfumes');
//     const [categories] = await db.query('SELECT DISTINCT category FROM perfumes');
//     const [types] = await db.query('SELECT DISTINCT type FROM perfumes');

//     res.locals.brands = brands.map((row) =>  row.brand );
//     res.locals.categories = categories.map((row) =>  row.category );
//     res.locals.types = types.map((row) =>  row.type );

//     next();
//   } catch (err) {
//     console.error('Error fetching filter data:', err);
//     res.status(500).send('Server Error');
//   }
// };

// module.exports = fetchFilters;

const db = require('../config/database_connection'); // pool.promise()

const fetchFilters = async (req, res, next) => {
  try {
    const queries = [
      db.query('SELECT DISTINCT brand FROM perfumes WHERE brand IS NOT NULL ORDER BY brand'),
      db.query('SELECT DISTINCT category FROM perfumes WHERE category IS NOT NULL ORDER BY category'),
      db.query('SELECT DISTINCT type FROM perfumes WHERE type IS NOT NULL ORDER BY type'),
    ];

    const [[brands], [categories], [types]] = await Promise.all(queries);

    res.locals.brands = brands.map(row => row.brand);
    res.locals.categories = categories.map(row => row.category);
    res.locals.types = types.map(row => row.type);

    next();
  } catch (err) {
    console.error('Error fetching filter data:', err.message);
    next(err); // Let error-handling middleware deal with it
  }
};

module.exports = fetchFilters;
