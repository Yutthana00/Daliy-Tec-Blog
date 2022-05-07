const router = require('express').Router();
const res = require('express/lib/response');
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Comment.findAll({})
    .then(commentData => req.json(commentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// Comment search by id (findAll).
router.get('/', (req, res) => {
    Comment.findAll({
        where: {
            id: req.params.id
        }
    })
    .then(commentData => res.json(commentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// Create new comment.
router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete comment.                                          
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!commentData) {
            res.status(404).json({ message: '404 Blog not found'});
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;