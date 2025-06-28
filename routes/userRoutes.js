import { Router } from 'express'

const router = Router()

router.get('/', async (req, res) => {
  res.json({ msg: 'Hola mundo' })
})

router.get('/nosotros', async (req, res) => {
  res.send('Nosotros')
})

export default router
