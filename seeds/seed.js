const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const blogData = require('./blogData.json');
const commentData = require('./commentData.json');
const userData = require('userData.json');
const sequelize = require('../config/connection');

const seedDatabase = async () => {
    await sequelize.sync({ force: true});

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const blog of blogData) {
        await Blog.create({
            ...blog,
            user_id: users[Math.floor(Math.random() * users.length)].isSoftDeleted,
        });

    }

    const comments = await Comment.bulkCreate(commentData, {
        returning: true,
    });

    process.exit(0);
};

seedDatabase();