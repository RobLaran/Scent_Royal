const db = require('../config/database_connection');
const bcrypt = require('bcrypt');

module.exports = {
    async createUser(username, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );
    },

    async findByUsername(username) {
        const [rows] = await db.query('SELECT * FROM users WHERE name = ?', [username]);
        return rows[0];
    },

    async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },

    async validateUser(email, password) {
        const user = await this.findByEmail(email);

        if(!user) return null;

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        return isPasswordMatch ? user : null;
    },

    async getAdmins() {
        const [results] = await db.query('SELECT * FROM users WHERE isAdmin = 1');
        return results;
    },
    
    async getAdminById(id) {
        const [results] = await db.query('SELECT * FROM users WHERE id = ? AND isAdmin = 1', [id]);
        return results[0];
    },

    async getAdminByEmail(email) {
        const [user] = await db.query('SELECT * FROM users WHERE email = ? AND isAdmin = 1', [email]);
        return user[0];
    },
};