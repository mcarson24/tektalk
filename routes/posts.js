import express from 'express'
import posts_controller from '../controllers/posts_controller.js'
import comments_controller from '../controllers/comments_controller.js'
import { authorized } from '../utils/middleware.js'

const router = express.Router()

router.get('/create', authorized, (req, res) => posts_controller.create(req, res))
router.get('/:id', (req, res) => posts_controller.show(req, res))
router.post('/', authorized, (req, res) => posts_controller.store(req, res))

router.post('/:id/comments', authorized, (req, res) => comments_controller.store(req, res, req.params.id))

export default router