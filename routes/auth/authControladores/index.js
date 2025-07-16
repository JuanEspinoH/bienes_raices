import prisma from '../../../database/db.js'
import { userValidations } from '../../../utils/validations.js'
import { enviarEmail } from '../../../utils/emailSender.js'
import { generarToken } from '../../../utils/generarToken.js'

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
        errores: [{ msg: 'Email ya esta registrado 1' }],
        usuario: {
          nombre: req.body.nombre,
          password: req.body.password,
          email: req.body.email,
          repetir_password: req.body.repetir_password,
        },
      })
    }

    const token = generarToken()
    const newUser = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password,
        token,
      },
    })

    await enviarEmail({ nombre, email, token })
  } catch (error) {
    console.log(error)
  }

  res.render('auth/mensaje', {
    pagina: 'Cuenta Creada Correctamente',
    mensaje:
      'Hemos enviado un Email de confirmacion, presiona el enlace en el correo para confirmar y continuar.',
  })
}

export const confirmar = async (req, res, next) => {
  const { token } = req.params
  const usuario = await prisma.usuario.findFirst({
    where: {
      token,
    },
  })

  if (!usuario) {
    return res.render('auth/confirmar-cuenta', {
      pagina: 'Error al confirmar tu cuenta',
      mensaje: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
      error: true,
    })
  }

  await prisma.usuario.update({
    where: { token: token, id: usuario.id },
    data: {
      token: null,
      confirmado: true,
    },
  })

  res.render('auth/confirmar-cuenta', {
    pagina: 'Cuenta Confirmada',
    mensaje: 'La cuenta se confirmo correctamente',
  })

  next()
}
