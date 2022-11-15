const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');


//Creates blog
router.post('/', withAuth, async function(req, res) {
    try {
        const data = await Blog.create({
            title: req.body.title,
            description: req.body.content,
            user_id: req.session.user_id,
        });
        res.status(200).json(data);
    } 
    catch (err) {
        res.status(400).json(err);
    }
});


router.post('/:id', withAuth, async function(req, res) {
    try {
        const data = await Blog.findByPk(req.params.id);
        await data.update({
            title: req.body.title,
            description: req.body.content,
            user_id: req.session.user_id,
        })

        await data.save();
        console.log(data);
        res.status(200).json(data);
    } 
    catch (err) {
        res.status(400).json(err);
    }
});



//Deletes blog with giving id
router.delete('/:id', withAuth, async function(req, res) {
    try {
        const data = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if(!data) {
            res.status(404).json({message: 'Blog not found'})
            return
        }
        res.status(200).json(data)
    } 
    catch (err) {
        res.status(500).json(err);
    }
})

router.get('/getBlog/:id', withAuth, async function(req, res) {
    try {
        console.log(req.params.id);
        const data = await Blog.findByPk(req.params.id);

        if(!data) {
            res.status(404).json({message: 'Blog not found'})
            return
        }

        const blog = data.get({
            plain: true
        })
        console.log(blog)
        res.json(blog)
    } 
    catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;