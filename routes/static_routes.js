import express from 'express'
import static_controller from '../controllers/static_controller.js'

const router = express.Router()

router.get('/', (req, res) => static_controller.home(req, res))

export default router