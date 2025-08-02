const db = require('../database_connection');

function fetchTypes(req, res, next) {
  const distinctTypes = 'SELECT DISTINCT type FROM perfumes ';

  db.query(distinctTypes, (err, result) => {
    if (err) return next(err);

    req.types = result.map(row => row.type);;

    next();
  });
}

module.exports = fetchTypes;