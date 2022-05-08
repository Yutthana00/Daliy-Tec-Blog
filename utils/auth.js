const withAuth = (req, res, next) => {

    // Redirect to login page if user if is not logged in.
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;