import { Post, User } from '../models/index.js'

const index = async (req, res) => {
  const user = await User.findByPk(req.session.user.id, {
    include: {
      model: Post,
      as: 'posts',
    },
    order: [
      [{ model: Post, as: 'posts' }, 'createdAt', 'DESC']
    ]
  })
  user.posts = user.posts.map(post => post.get({ plain: true }))
  return res.render('dashboard', {
    user: user.get({ plain: true })
  })
}

export default index