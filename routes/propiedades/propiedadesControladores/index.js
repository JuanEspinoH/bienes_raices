export const admin = (req, res) => {
  return res.render('propiedades/admin', {
    pagina: 'Mis propiedades',
    barra: true,
  })
}

export const crearPropiedades = (req, res) => {
  return res.render('propiedades/crear', {
    pagina: 'Crear Propiedades',
    barra: true,
    usuario: {
      titulo: req.body.titulo,
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
