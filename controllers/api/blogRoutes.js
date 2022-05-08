const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Blog } = require('../../models');

// Create a new blog post
router.post('/', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            user_id:
            req.session.user_id,
        });

        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});
// Deleting blog 
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!blogData) {
            req.status(404).json({ message: '404 Blog id not Found' });
            return; 
        }

        res.status(200),json(blogData);
    }   catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router; 