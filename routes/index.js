import express from 'express'
import auth_routes from './auth.js'
import static_routes from './static.js'

const router = express.Router()

router.use(auth_routes)
router.use(static_routes)

export default router