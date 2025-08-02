const db = require('../config/database_connection');

module.exports = {
    async getBlogs() {
        const [results] = await db.query('SELECT * FROM blogs');
        return results;
    }
};
