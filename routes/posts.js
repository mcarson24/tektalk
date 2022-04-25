import express from 'express'
import posts_controller from '../controllers/posts_controller.js'

const router = express.Router()

router.get('/:id', (req, res) => posts_controller.show(req, res))

export default router