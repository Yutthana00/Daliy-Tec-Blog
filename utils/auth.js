const withAuth = (req, res) => {

    // Redirect to login page if user if is not logged in.
    if (!req.session.logged_in) {
        res.redirect('/ligin');
    } else {
        next ();
    }
};

module.exports = withAuth;