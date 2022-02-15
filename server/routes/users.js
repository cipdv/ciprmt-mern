import express from 'express'

//controllers
import { register, login, userTypeVerification, sendPasswordResetLink } from '../controllers/users.js'

//middleware
import verify from '../middleware/verify.js'

const router = express.Router()

//register user
router.post('/register', register)
//login user
router.post('/login', login)
//verify a user? not sure I need this route...
router.get('/usertype', verify, userTypeVerification)
//password reset
router.post('/resetpassword', sendPasswordResetLink)

export default router
