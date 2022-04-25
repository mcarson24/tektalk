import path, { dirname } from 'path'
import express from 'express'
import { create } from 'express-handlebars'
import routes from './routes/index.js'
import { fileURLToPath } from 'url'
import connection from './config/db.js'
import session from 'express-session'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const PORT = 3001 || process.env.PORT
const app = express()

const hbs = create({
  extname: '.hbs'
})

app.use(session({
  secret: process.env.APP_KEY,
  resave: false,
  saveUninitialized: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')
app.set('views', './views')

app.use(routes)

connection.sync({force: false }).then(() => {
  app.listen(PORT, () => console.log(`Up and running! Listening on http://localhost:${PORT}`))
})