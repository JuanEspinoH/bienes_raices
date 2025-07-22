import { Router } from 'express'
import {
  admin,
  crearPropiedades,
  deletePropiedades,
} from './propiedadesControladores/index.js'

const router = Router()

router.get('/mis-propiedades', admin)
router.get('/propiedades/crear', crearPropiedades)
router.delete('/propiedades/:id', deletePropiedades)

export default router
