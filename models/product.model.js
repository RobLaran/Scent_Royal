const db = require('../config/database_connection');

module.exports = {
    async getProducts() {
        const [results] = await db.query('SELECT * FROM perfumes');
        return results;
    },

    async getByBrand(brand) {
        const [results] = await db.query('SELECT * FROM perfumes WHERE brand = ?', [brand]);
        return results;
    },

    async getByType(type) {
        const [results] = await db.query('SELECT * FROM perfumes WHERE type = ?', [type]);
        return results;
    },

    async getByCategory(category) {
        const [results] = await db.query('SELECT * FROM perfumes WHERE category = ?', [category]);
        return results;
    },

    async getById(id) {
        const [results] = await db.query('SELECT * FROM perfumes WHERE id = ?', [id]);
        return results[0]; // Return single product
    }
};
