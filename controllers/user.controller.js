const userModel = require('../models/user.model');

module.exports = {
    async login(req, res) {
        const { login_email, login_password } = req.body;

        try {
            const user = await userModel.validateUser(login_email, login_password);

            if (!user) {
                return res.status(404).render('pages/errors/404', { 
                    title: 'Invalid', 
                    message: 'Invalid credentials' 
                });
            } else if(user.isAdmin) {
                return res.status(404).render('pages/errors/404', { 
                    title: 'Invalid', 
                    message: 'You are trying to log in as an Admin' 
                });
            }

            // Store login in session
            req.session.user = user;
            req.session.isLoggedIn = true;

            res.redirect('/');
        } catch(err) {
            console.error('Error:', err);
            res.status(500).render('pages/errors/500', { 
                title: 'Internal Server Error', 
                message: 'Server error during login' 
            });
        }
    },
    async register(req, res) {
        const { register_username, register_email, register_password } = req.body;

        try {
            const isUsernameExist = await userModel.findByUsername(register_username) ? true : false;
            const isEmailExist = await userModel.findByUsername(register_email) ? true : false;

            if(isUsernameExist) {
                return res.status(400).render('pages/errors/400', { 
                    title: 'Invalid Registration', 
                    message: 'Username Already Exist' 
                });
            } else if(isEmailExist) {
                return res.status(400).render('pages/errors/400', { 
                    title: 'Invalid Registration', 
                    message: 'Email Already Registered' 
                });
            }

            await userModel.createUser(register_username, register_email, register_password);

            res.redirect('/user/login');
        } catch(err) {
            console.error('Error:', err);
            res.status(500).render('pages/errors/500', { 
                title: 'Internal Server Error', 
                message: 'Server error during registration' 
            });
        }
    },
    async logout(req, res) {
        req.session.destroy(() => {
            res.redirect('/user/login');
        });
    },
}