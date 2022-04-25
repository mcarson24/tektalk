import User from "../models/User.js"

const login = async (req, res) => {
  if (!req.body.username || !req.body.password) return res.redirect('/login')
  try {
    // Find the user by the username
    const user = await User.findOne({ where: { username: req.body.username }})

    if (!user) {
      res.redirect('/login')
    
    }
    // Compare the password with the hashed password stored for that user
    const valid = await user.isValid(req.body.password)
    if (!valid) {
      // TODO: Send flash message with validation errors.
      res.redirect('/login')
    }

    // If they match log in user (save in session)
    req.session.save(() => {
      req.session.user = user
      return res.redirect('/')
    })
  } catch (err) {
    res.status(500).json(err)
  }
}

const signup = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) return res.redirect('/signup')

    const user = await User.create({
      username: req.body.username,
      password: req.body.password
    })
    req.session.save(() => {
      req.session.user = user.get({ plain: true})
      res.redirect('/')
    })
  } catch (err) {
    // TODO: Send flash message with validation errors.
    res.redirect('/signup')
  }
}

const logout = async (req, res) => {
  if (req.session.user) {
    req.session.destroy(() => {
      res.redirect('/')
    })
  } else {
    res.status(404).end()
  }
}

export default { login, signup, logout }