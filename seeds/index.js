import { Comment, Post, User } from '../models/index.js'
import sequelize from '../config/db.js'
import users from './users.json' assert { type: 'json' }
import posts from './posts.json' assert { type: 'json' }
import comments from './comments.json' assert { type: 'json' }

const seed = async () => {
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true })
  await sequelize.sync({ force: true })
  await User.bulkCreate(users, {
    individualHooks: true
  })
  console.log('---USERS TABLE SEEDED---')
  await Post.bulkCreate(posts, {
    individualHooks: true
  })
  console.log('---POSTS TABLE SEEDED---')
  await Comment.bulkCreate(comments, {
    individualHooks: true
  })
  console.log('---COMMENTS TABLE SEEDED---')
  process.exit(0)
}

seed()