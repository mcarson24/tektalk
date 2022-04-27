const authorized = (req, res, next) => {
  if (!req.session.user) return res.redirect('/login')

  next()
}

export { authorized }