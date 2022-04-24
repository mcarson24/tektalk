import express from 'express'
import * as dotenv from 'dotenv'

dotenv.config()
console.log(process.env.PORT)
const PORT = 3001 || process.env.PORT
const app = express()

app.listen(PORT, () => console.log(`Up and running! Listening on http://localhost:${PORT}`))