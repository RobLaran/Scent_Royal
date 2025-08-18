const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');

module.exports = {
    async loginAsAdmin(req, res) {
        try {
            const { email, password } = req.body;

            const user = await userModel.getAdminByEmail(email);
            
            if (!user) {
                return res.status(404).render('pages/errors/404', { 
                    title: 'Invalid', 
                    message: 'Invalid credentials' 
                });
            } else if(user.password !== password) {
                return res.status(404).render('pages/errors/404', { 
                    title: 'Invalid', 
                    message: 'Wrong password' 
                });
            }

            // Store login in session
            req.session.user = user;
            req.session.isLoggedIn = true;

            // If admin
            if (user.isAdmin) {
                return res.redirect('/admin/dashboard');
            } else {
                // If normal user
                res.redirect('/');
            }
        } catch (err) {
            console.error('Error:', err);
            res.status(500).render('pages/errors/500', { 
                title: 'Internal Server Error', 
                message: 'Cannot Login as Admin' 
            });
        }
    },
    logoutAdmin(req, res) {
        req.session.destroy(() => {
            res.redirect('/admin/login');
        });
    }
};



