import prisma from '../../../database/db.js'
import { propiedadesValidations } from '../../../utils/validations.js'

export const admin = (req, res) => {
  return res.render('propiedades/admin', {
    pagina: 'Mis propiedades',
    barra: true,
  })
}

export const crearPropiedades = async (req, res) => {
  const [categorias, precios] = await Promise.all([
    prisma.categoria.findMany(),
    prisma.precio.findMany(),
  ])

  return res.render('propiedades/crear', {
    pagina: 'Crear Propiedades',
    csrfToken: req.csrfToken(),
    barra: true,
    data: {
      categorias,
      precios,
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
    },
  })
}
export const crearPropiedadesFormulario = async (req, res) => {
  const [categorias, precios] = await Promise.all([
    prisma.categoria.findMany(),
    prisma.precio.findMany(),
  ])
  const validacionesCheck = await propiedadesValidations(req.body)

  console.log(validacionesCheck.errors)

  if (validacionesCheck.length !== 0) {
    return res.render('propiedades/crear', {
      pagina: 'Crear Propiedades',
      barra: true,
      csrfToken: req.csrfToken(),
      errores: validacionesCheck.errors,

      data: {
        categorias,
        precios,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
      },
    })
  }

  const newPropiedad = await prisma.propiedad.create({
    data: {
      descripcion: req.body.descripcion,
      habitaciones: Number(req.body.habitaciones),
      estacionamiento: Number(req.body.estacionamiento),
      wc: Number(req.body.wc),
      calle: req.body.calle,
      lat: req.body.lat,
      lng: req.body.lng,
      imagen: 'test',
      categoria: {
        connect: {
          nombre: req.body.categoria,
        },
      },
      precio: {
        connect: {
          nombre: req.body.precio,
        },
      },
      usuario: {
        connect: {
          id: req.usuario.id,
        },
      },
    },
  })

  return res.render('propiedades/crear', {
    pagina: 'Crear Propiedades',
    barra: true,
    csrfToken: req.csrfToken(),
    // errores
    data: {
      categorias,
      precios,
    },
  })
}

export const deletePropiedades = (req, res) => {
  const { id } = req.params
  return res.render('propiedades/admin', {
    pagina: 'Mis propiedades',
    barra: true,
  })
}
