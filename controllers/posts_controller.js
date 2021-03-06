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
          },
        ]
      }
    ],
    order: [
      [{ model: Comment, as: 'comments' }, 'createdAt', 'DESC']
    ]
  })

  if (!post) return res.status(404).redirect('/')

  post.comments.map(comment => comment.get({ plain: true }))

  res.render('posts/show', {
    post: post.get({ plain: true }),
    user: req.session.user,
    post_edit_path: `/posts/${post.id}/edit`
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

  return res.redirect(`/dashboard`)
}

// Make sure the user owns the post, otherwise they shouldn't be able to update it.
const edit = async (req, res) => {
  const post = await Post.findByPk(req.params.id)
  res.render('posts/edit', {
    user: req.session.id,
    post: post.get({ plain: true }),
    post_path: `/posts/${post.id}`,
  })
}

const update = async (req, res) => {
  const post = await Post.findByPk(req.params.id)
  if (post.user_id !== req.session.user.id) return res.redirect('/dashboard')
  await post.update({
    title: req.body.title,
    body: req.body.body
  })
  return res.redirect(`/posts/${req.params.id}/edit`)
}

const destroy = async (req, res) => {
  console.log('here')
  await Post.destroy({ where: { id: req.params.id }})

  res.redirect('/dashboard')
}

export default { create, show, store, edit, update, destroy }