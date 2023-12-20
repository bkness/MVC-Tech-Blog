const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    try {
        console.log('Received comment request:', req.body);

        const newComment = await Comment.create({
            user_id: req.session.user_id,
            commentPost: req.body.comment,
            blog_id: req.body.blog_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!commentData) {
            res.status(404).json({ message: 'Comment was not found' });
            return;
        }
        res.status(200).json({ message: 'Comment was deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const comment = await Comment.findOne({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!comment) {
            res.status(404).json({ message: 'Comment not found or user not authorized' });
            return;
        }

        comment.commentPost = req.body.commentPost; // Adjust this line based on your actual field name

        // Save the updated comment
        await comment.save();

        // Send the updated comment as a JSON response
        res.status(200).json({ message: 'Comment updated successfully', comment });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
