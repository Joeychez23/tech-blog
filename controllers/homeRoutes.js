const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');



//Gets all blogs from all users to post to the Homepage 
router.get('/', async function (req, res) {
	try {
		const data = await Blog.findAll({
			include: [{
				model: User,
				attributes: ['username']
			}]
		});

		let blogs = new Array
		for (let i = 0; i < data.length; i++) {
			blogs[blogs.length] = data[i].get({
				plain: true
			})
		}


		res.render('home', {
			blogs,
			logged_in: req.session.logged_in
		});
	} catch (err) {
		res.status(500).json(err)
	}
});


//If logged into session you'll be redirected to dashboard
router.get('/login', async function (req, res) {
	if (req.session.logged_in) {
		res.redirect('/dashboard');
		return;
	}
	res.render('login');
});

//If logged into session you'll be redirected to dashboard
router.get('/signup', async function (req, res) {
	if (req.session.logged_in) {
		res.redirect('/dashboard');
		return;
	}
	res.render('signup')
})


router.get('/dashboard', withAuth, async function (req, res) {
	try {

		//Grab current user from the User table using the primary key provided in the session
		const data = await User.findByPk(req.session.user_id, {
			attributes: {
				exclude: ['password']
			},
			include: [{
				model: Blog
			}],
		})

		const user = data.get({
			plain: true
		})

		res.render('dashboard', {
			...user,
			logged_in: true

		})
	} catch (err) {
		res.status(500).json(err)
	}
})



////Gets 1 blog from the id passed in to render the blog and comments to the hjs file
router.get('/blog/:id', async function (req, res) {
	try {
		const data = await Blog.findByPk(req.params.id, {
			include: [
				{
					model: User,
					attributes: ['username']
				},
				{
					model: Comment,
					include: [
						User
					]
				}
			]
		});
		const blog = data.get({
			plain: true
		})

		res.render('blog', {
			...blog,
			logged_in: req.session.logged_in
		});
	} catch (err) {
		res.status(500).json(err);
	}
})



module.exports = router;