import express from 'express'
import auth_controller from '../controllers/auth_controller.js'

const router = express.Router()

router.post('/login', (req, res) => auth_controller.login(req, res))
router.post('/signup', (req, res) => auth_controller.signup(req, res))

export default router