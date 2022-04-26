import { Post, User } from '../models/index.js'

const index = (req, res) => {
  const user = User.findByPk(req.session.user.id, {
    include: {
      model: Post,
      as: 'posts'
    }
  })

  return res.render('dashboard', {
    user: user
  })
}

export default index