import User from "../models/User.js"

const login = (req, res) => {
  if (!req.body.username || !req.body.password) return res.redirect('/login')

  res.end()
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