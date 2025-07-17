import { Router } from 'express'

import {
  formularioLogin,
  formularioSignUp,
  formularioOlvidarContraseña,
  registro,
  confirmar,
  resetPassword,
  nuevoPassword,
  comprobarToken,
} from './authControladores/index.js'

const router = Router()

router.get('/login', formularioLogin)

router.get('/sign-up', formularioSignUp)
router.post('/sign-up', registro)

router.get('/olvide-password', formularioOlvidarContraseña)
router.post('/olvide-password', resetPassword)

router.get('/mensaje', confirmar)
router.get('/confirmar/:token', confirmar)

router.get('/resetear-password/:token', comprobarToken)
router.post('/resetear-password/:token', nuevoPassword)

export default router
