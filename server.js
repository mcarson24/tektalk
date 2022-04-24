import path, { dirname } from 'path'
import express from 'express'
import * as dotenv from 'dotenv'
import { create } from 'express-handlebars'
import static_routes from './routes/static_routes.js'
import { fileURLToPath } from 'url'

dotenv.config()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const PORT = 3001 || process.env.PORT
const app = express()

const hbs = create({
  extname: '.hbs'
})

app.use(express.static(path.join(__dirname, 'public')))

app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')
app.set('views', './views')

app.use(static_routes)

app.listen(PORT, () => console.log(`Up and running! Listening on http://localhost:${PORT}`))