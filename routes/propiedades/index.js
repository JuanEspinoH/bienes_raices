import { Router } from 'express'
import {
  admin,
  crearPropiedades,
  deletePropiedades,
  crearPropiedadesFormulario,
} from './propiedadesControladores/index.js'
import protegerRuta from '../../middleware/protegerRuta.js'

const router = Router()

router.get('/mis-propiedades', protegerRuta, admin)
router.get('/propiedades/crear', protegerRuta, crearPropiedades)
router.post('/propiedades/crear', protegerRuta, crearPropiedadesFormulario)
router.delete('/propiedades/:id', protegerRuta, deletePropiedades)

export default router
