import { Comment } from '../models/index.js'

const store = async (req, res, post_id) => {
  if (!req.body.body) return res.redirect(`/posts/${req.params.id}`)
  await Comment.create({
    body: req.body.body,
    user_id: req.session.user.id,
    post_id
  })

  res.redirect(`/posts/${post_id}`)
}

export default { store }