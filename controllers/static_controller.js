import { Post, User } from '../models/index.js'

const home = async (req, res) => {
  const posts = await Post.findAll({
    include: {
      model: User,
      as: 'user'
    }
  })
  console.log(posts)
  res.render('static/home', { 
    user: req.session.user,
    posts: posts.map(post => post.get({ plain: true }))
  })
}

const login = (req, res) => res.render('static/login')
const signup = (req, res) => res.render('static/signup')

export default { home, login, signup }