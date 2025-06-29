import { Router } from 'express'

import loginRouter from './login.js'
import signUpRouter from './sign-up.js'
import signInRouter from './sign-in.js'
import { formularioLogin, formularioSignUp } from './authControladores/index.js'

const router = Router()

router.get('/login', formularioLogin)
router.get('/sign-up', formularioSignUp)

export default router
