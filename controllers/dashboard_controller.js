import { Post, User } from '../models/index.js'

const index = async (req, res) => {
  const user = await User.findByPk(req.session.user.id, {
    include: {
      model: Post,
      as: 'posts'
    }
  })
  user.posts = user.posts.map(post => post.get({ plain: true }))
  return res.render('dashboard', {
    user: user.get({ plain: true })
  })
}

export default index