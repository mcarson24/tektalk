import { Comment, Post, User } from '../models/index.js'

const show = async (req, res) => {
  const post = await Post.findByPk(req.params.id, {
    include: [
      {
        model: User,
        as: 'user'
      },
      {
        model: Comment,
        as: 'comments',
        include: [
          {
            model: User,
            as: 'user'
          }
        ]
      }
    ]
  })

  if (!post) return res.status(404)
  post.comments.map(comment => comment.get({ plain: true }))

  res.render('posts/show', {
    post: post.get({ plain: true }),
    user: req.session.user
  })
}

export default { show }