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
      res.redirect('/login')
    }

    // If they match log in user (save in session)
    req.session.save(() => {
      req.session.user = user
      return res.redirect('/')
    })
  } catch (err) {
    console.log('got here')
    // res.status(500).json(err)
  }
}

const signup = (req, res) => {
  if (!req.body.username || !req.body.password) return res.redirect('/signup')

  User.create({
    username: req.body.username,
    password: req.body.password
  })
  // TODO: Log in new user, save logged in user to the session, redirect to dashboard page.
  res.redirect('/')
}

export default { login, signup }