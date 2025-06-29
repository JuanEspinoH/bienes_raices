import { Router } from 'express'
import { formularioSignUp } from './authControladores/index.js'

const router = Router()

router.get('/', formularioSignUp)

export default router
