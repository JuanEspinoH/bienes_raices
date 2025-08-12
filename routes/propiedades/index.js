import { Router } from 'express'
import {
  admin,
  crearPropiedades,
  deletePropiedades,
  crearPropiedadesFormulario,
  agregarImagen,
  almacenarImagen,
} from './propiedadesControladores/index.js'
import protegerRuta from '../../middleware/protegerRuta.js'
import upload from '../../middleware/subirArchivo.js'

const router = Router()

router.get('/mis-propiedades', protegerRuta, admin)
router.get('/propiedades/crear', protegerRuta, crearPropiedades)
router.post('/propiedades/crear', protegerRuta, crearPropiedadesFormulario)
router.delete('/propiedades/:id', protegerRuta, deletePropiedades)
router.get('/propiedades/agregar-imagen/:id', protegerRuta, agregarImagen)

router.post(
  '/propiedades/agregar-imagen/:id',
  protegerRuta,
  upload.single('imagen'),
  almacenarImagen
)

export default router
