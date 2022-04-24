import User from '../models/User.js'
import sequelize from '../config/db.js'

const users = [
  {
    username: 'frankiefasthands',
    password: 'password'
  },
  {
    username: 'hughhoney',
    password: 'password'
  },
  {
    username: 'vicvinegar',
    password: 'password'
  },
  {
    username: 'QueenOfThrones',
    password: 'password'
  }
]

const seed = async () => {
  await sequelize.sync({ force: true })
  await User.bulkCreate(users, {
    individualHooks: true
  })
  console.log('---USERS TABLE SEEDED---')

  process.exit(0)
}

seed()