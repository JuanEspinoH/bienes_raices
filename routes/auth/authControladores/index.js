import prisma from '../../../database/db.js'
import { userValidations } from '../../../utils/validations.js'
export const formularioLogin = async (req, res) => {
  res.render('auth/login', { autenticado: true, pagina: 'Iniciar Sesion' })
}

export const formularioSignUp = async (req, res) => {
  res.render('auth/sign-up', { autenticado: true, pagina: 'Crear Cuenta' })
}

export const formularioOlvidarContraseña = async (req, res) => {
  res.render('auth/olvide-password', {
    autenticado: true,
    pagina: 'Recuperar Contraseña',
  })
}
export const registro = async (req, res) => {
  const { nombre, email, password, repetir_password } = req.body

  const checkUserData = await userValidations(req)
  if (checkUserData.errors.length !== 0) {
    console.log('entro a errores if')
    return res.render('auth/sign-up', {
      pagina: 'Crear Cuenta',
      errores: checkUserData.errors,
      usuario: {
        nombre: req.body.nombre,
        password: req.body.password,
        email: req.body.email,
        repetir_password: req.body.repetir_password,
      },
    })
  }
  try {
    const checkExistingUser = await prisma.usuario.findFirst({
      where: {
        email,
      },
    })
    if (checkExistingUser !== null) {
      return res.render('auth/sign-up', {
        pagina: 'Crear Cuenta',
        errores: [{ msg: 'Email ya esta registrado' }],
        usuario: {
          nombre: req.body.nombre,
          password: req.body.password,
          email: req.body.email,
          repetir_password: req.body.repetir_password,
        },
      })
    }
    const newUser = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password,
      },
    })
  } catch (error) {
    console.log(error)
  }

  res.render('auth/sign-up', { autenticado: true, pagina: 'Crear Cuenta' })
}
