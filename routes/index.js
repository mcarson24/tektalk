import express from 'express'
import auth_routes from './auth.js'
import post_routes from './posts.js'
import static_routes from './static.js'
import dashboard_controller from '../controllers/dashboard_controller.js'
import { authorized } from '../utils/middleware.js'

const router = express.Router()

router.get('/dashboard', authorized, (req, res) => dashboard_controller(req, res))

router.use(auth_routes)
router.use(static_routes)
router.use('/posts', post_routes)

export default router