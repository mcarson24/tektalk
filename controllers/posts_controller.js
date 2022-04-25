import Post from '../models/Post.js'

const show = async (req, res) => {
  const post = await Post.findByPk(req.params.id)

  if (!post) return res.status(404)

  res.render('posts/show', {
    post: post.get({ plain: true })
  })
}

export default { show }