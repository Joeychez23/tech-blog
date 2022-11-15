const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');



//Creates comment
router.post('/', withAuth, async function(req, res) {
    try {
        const data = await Comment.create({
            comment_description: req.body.description,
            blog_id: req.body.blogId,
            user_id: req.session.user_id
        });
        res.status(200).json(data);
    } 
    catch (err) {
        res.status(500).json(err);
    }
})




module.exports = router;
