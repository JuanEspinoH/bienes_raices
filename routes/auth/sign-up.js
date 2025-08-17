import { Router } from 'express'

const router = Router()

router.get('/', async function (req, res) {
  res.render('auth/sign-up')
})

export default router
