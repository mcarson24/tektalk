import express from 'express'
import posts_controller from '../controllers/posts_controller.js'
import comments_controller from '../controllers/comments_controller.js'

const router = express.Router()

router.get('/:id', (req, res) => posts_controller.show(req, res))
router.post('/:id/comments', (req, res) => comments_controller.create(req, res, req.params.id))

export default router