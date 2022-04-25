import express from 'express'
import auth_routes from './auth.js'
import post_routes from './posts.js'
import static_routes from './static.js'

const router = express.Router()

router.use(auth_routes)
router.use(static_routes)
router.use('/posts', post_routes)

export default router