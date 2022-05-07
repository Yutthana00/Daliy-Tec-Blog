const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [{
                model: User,
                attrbutes: ['username'],
            },],
        });

        const blogs = blogData.map((blog) => blog.get({
            plain: true
        }));

        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('blog/:id', async (req, res) => {
    try {
        const blogData = await blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attrbutes: ['username'],
                }, {
                    model: Comment,
                    include: [
                        User
                    ]
                }
            ],
        });

        const blog = blofData.get({
            plain: true
        });

        res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).jason(err);
    }
});

router.get('/dashboard', withAuth, async (req,res) => {
    try {
        const userData = await User.findByPK(req.session.user_id, {
            attrbutes: {
                exclude: ['password']
            },
            include: [{
                model: Blog
            }],
        });

        const user = userData.get({
            plain: true
        });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).jason(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

router.get('signUp', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('signUp');
});

module.exports = router;