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
import upload from '../../middleware/subirImagen.js'
import cloudinarySubirImagen from '../../middleware/cloudinarySubirImagen.js'

const uploadCM = cloudinarySubirImagen()

const router = Router()

router.get('/', (req, res) => {
  res.json({
    msg: 'test home',
  })
})
router.get('/mis-propiedades', protegerRuta, admin)
router.get('/propiedades/crear', protegerRuta, crearPropiedades)
router.post('/propiedades/crear', protegerRuta, crearPropiedadesFormulario)
router.delete('/propiedades/:id', protegerRuta, deletePropiedades)
router.get('/propiedades/agregar-imagen/:id', protegerRuta, agregarImagen)

router.post(
  '/propiedades/agregar-imagen/:id',
  protegerRuta,
  // upload.single('imagen'), este era el middleware que solo usa multer , el de abajo es el multer con cloudinary que sube automaticamnete la imagen
  uploadCM.single('imagen'),
  almacenarImagen
)

export default router
