import { Router } from 'express'
import { formularioLogin } from './authControladores/index.js'
const router = Router()

router.get('/', formularioLogin)

export default router
