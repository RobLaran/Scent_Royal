function isAdminOnly(req, res, next) {
    if (!req.session.user?.isAdmin) {
        return res.status(403).render('pages/errors/403', { 
            title: 'Forbidden', 
            message: 'You are not allowed to access this page.' 
        });
    }

    next();
}

function isUser(req, res, next) {
    if (req.session.user?.isAdmin) {
        return res.status(404).render('pages/errors/404', { 
            title: 'Page not found', 
            message: 'You must login as a user.' 
        });
    }

    next();
}

module.exports = {
    isAdminOnly,
    isUser
};