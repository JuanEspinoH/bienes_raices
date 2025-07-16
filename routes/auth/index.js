import { Router } from 'express'

import {
  formularioLogin,
  formularioSignUp,
  formularioOlvidarContraseña,
  registro,
  confirmar,
} from './authControladores/index.js'

const router = Router()

router.get('/login', formularioLogin)

router.get('/sign-up', formularioSignUp)
router.post('/sign-up', registro)

router.get('/olvide-password', formularioOlvidarContraseña)
router.get('/mensaje', confirmar)
router.get('/confirmar/:token', confirmar)

export default router
