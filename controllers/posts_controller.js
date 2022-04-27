import { Comment, Post, User } from '../models/index.js'

const create = (req, res) => {
  res.render('posts/create', {
    user: req.session.user
  })
}

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

const store = async (req, res) => {
  const {title, body} = req.body
  
  if (!title || !body) return res.redirect('/posts/create')

  const post = await Post.create({
    title,
    body,
    user_id: req.session.user.id
  })

  return res.redirect(`/posts/${post.id}`)
}

export default { create, show, store }