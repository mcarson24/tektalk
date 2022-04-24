const home = (req, res) => res.render('static/home')

const login = (req, res) => res.render('static/login')
const signup = (req, res) => res.render('static/signup')

export default { home, login, signup }