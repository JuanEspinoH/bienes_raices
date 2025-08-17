import prisma from '../../../database/db.js'
import { propiedadesValidations } from '../../../utils/validations.js'
import cloudinaryUploadingImg from '../../../utils/cloudinaryUploadImg.js'

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
    categorias,
    precios,
    data: {
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      wc: req.body.wc,
      estacionamiento: req.body.estacionamiento,
      habitaciones: req.body.habitaciones,
      categoria: req.body.categoria,
      precio: req.body.precio,
      calle: req.body.calle,
      lat: req.body.lat,
      lng: req.body.lng,
    },
  })
}
export const crearPropiedadesFormulario = async (req, res) => {
  const [categorias, precios] = await Promise.all([
    prisma.categoria.findMany(),
    prisma.precio.findMany(),
  ])

  const validacionesCheck = await propiedadesValidations(req)

  if (validacionesCheck.errors.length !== 0) {
    return res.render('propiedades/crear', {
      pagina: 'Crear Propiedades',
      csrfToken: req.csrfToken(),
      barra: true,
      categorias,
      errores: validacionesCheck.errors,
      precios,
      data: {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        wc: req.body.wc,
        estacionamiento: req.body.estacionamiento,
        habitaciones: req.body.habitaciones,
        categoria: req.body.categoria,
        precio: req.body.precio,
        calle: req.body.calle,
        lat: req.body.lat,
        lng: req.body.lng,
      },
    })
  }

  try {
    const newPropiedad = await prisma.propiedad.create({
      data: {
        titulo: req.body.titulo,
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

    const { id } = newPropiedad

    res.redirect(`/propiedades/agregar-imagen/${id}`)
  } catch (error) {
    console.log(error)
    return res.render('propiedades/crear', {
      pagina: 'Crear Propiedades',
      csrfToken: req.csrfToken(),
      barra: true,
      categorias,
      errores: [{ msg: 'Un error ocurrio' }],
      precios,
      data: {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        wc: req.body.wc,
        estacionamiento: req.body.estacionamiento,
        habitaciones: req.body.habitaciones,
        categoria: req.body.categoria,
        precio: req.body.precio,
        calle: req.body.calle,
        lat: req.body.lat,
        lng: req.body.lng,
      },
    })
  }
}

export const deletePropiedades = (req, res) => {
  const { id } = req.params
  return res.render('propiedades/admin', {
    pagina: 'Mis propiedades',
    barra: true,
  })
}

export const agregarImagen = async (req, res) => {
  const { id } = req.params

  try {
    const propiedad = await prisma.propiedad.findFirst({
      where: {
        id,
      },
    })

    if (!propiedad) {
      return res.redirect('/mis-propiedades')
    }
    // if (!propiedad.publicado) {
    //   return res.redirect('/mis-propiedades')
    // }

    if (propiedad.usuarioId.toString() !== req.usuario.id.toString()) {
      return res.redirect('/mis-propiedades')
    }

    return res.render(`propiedades/agregar-imagen`, {
      barra: true,
      pagina: `Agregar Imangen ${propiedad.titulo} `,
      csrfToken: req.csrfToken(),
      propiedad: propiedad,
    })
  } catch (error) {
    console.log(error)
  }
}

export const almacenarImagen = async (req, res, next) => {
  const { id } = req.params
  let propiedad
  const imgData = await req.file

  try {
    propiedad = await prisma.propiedad.findFirst({
      where: {
        id,
      },
    })

    await prisma.propiedad.update({
      where: {
        id,
      },
      data: {
        imagen: req.file.path,
      },
    })

    return res.redirect('/mis-propiedades')
  } catch (error) {
    console.log(error)
  }
}
