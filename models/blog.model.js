const db = require('../config/database_connection');

module.exports = {
    async getBlogs() {
        const [results] = await db.query('SELECT * FROM blogs');
        return results;
    },
    async getBlogById(id) {
        const [results] = await db.query('SELECT * FROM blogs WHERE id = ?', [id]);
        return results[0];
    }
};
