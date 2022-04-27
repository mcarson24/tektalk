import express from 'express'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import session from 'express-session'
import routes from './routes/index.js'
import connection from './config/db.js'
import { create } from 'express-handlebars'
import connect from 'connect-session-sequelize'
import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime.js'
import AdvancedFormat from 'dayjs/plugin/advancedFormat.js'

const SequelizeStore = connect(session.Store)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const PORT = process.env.PORT || 3001
const app = express()

dayjs.extend(RelativeTime)
dayjs.extend(AdvancedFormat)

const hbs = create({
  extname: '.hbs',
  helpers: {
    readable_time: date => dayjs().to(dayjs(date)),
    format_time: date => dayjs(date).format('dddd, MMMM Do, YYYY'),
    if_user_owns_post: (one, two, options) => {
      console.log(options)
      return (one === two) ? options.fn(this) : options.inverse(this)
    },
    post_edit_path: post => `/posts/${post.id}/edit`
  }
})

app.use(session({
  secret: process.env.APP_KEY,
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: connection,
    // table: 'sessions' // C'mon lets all embrace the lowercaseness.
  })
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