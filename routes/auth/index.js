import { Router } from 'express'

import {
  formularioLogin,
  formularioSignUp,
  formularioOlvidarContraseña,
  registro,
} from './authControladores/index.js'

const router = Router()

router.get('/login', formularioLogin)

router.get('/sign-up', formularioSignUp)
router.post('/sign-up', registro)

router.get('/olvide-password', formularioOlvidarContraseña)

export default router
