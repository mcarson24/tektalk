import User from '../models/User.js'
import Post from '../models/Post.js'
import sequelize from '../config/db.js'
import users from './users.json' assert { type: 'json' }
import posts from './posts.json' assert { type: 'json' }

const seed = async () => {
  await sequelize.sync({ force: true })
  await User.bulkCreate(users, {
    individualHooks: true
  })
  console.log('---USERS TABLE SEEDED---')
  await Post.bulkCreate(posts, {
    individualHooks: true
  })
  console.log('---POSTS TABLE SEEDED---')

  process.exit(0)
}

seed()