const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');
const blogSeed = require('./blogSeed.js');
const commentSeed = require('./commentSeed.js');
const userDataSeed = require('./userDataSeed.js')

const seedAll = async () => {

    setTimeout(async function () {
        await sequelize.sync({ force: true });
        const users = await User.bulkCreate(userDataSeed, {
            individualHooks: true,
            returning: true,
        });

        const blog = await Blog.bulkCreate(blogSeed, {
            returning: true,
        });
        const comments = await Comment.bulkCreate(commentSeed, {
            returning: true,
        });
    }, 50);
};

module.exports = seedAll();