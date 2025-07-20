import prisma from '../../../database/db.js'
import {
  userValidations,
  passwordValidations,
  resetValidations,
  loginValidations,
} from '../../../utils/validations.js'
import {
  enviarEmail,
  enviarEmailPassword,
  enviarEmailPasswordReset,
} from '../../../utils/emailSender.js'
import { generarToken } from '../../../utils/generarToken.js'
import argon2 from 'argon2'
import jwtGenerator from '../../../utils/jwtGenerator.js'

export const formularioLogin = async (req, res) => {
  res.render('auth/login', {
    autenticado: true,
    pagina: 'Iniciar Sesion',
    csrfToken: req.csrfToken(),
    usuario: {
      password: req.body.password,
      email: req.body.email,
    },
  })
}

export const autenticar = async (req, res) => {
  const { password, email } = req.body

  const loginCheck = await loginValidations(req)

  if (loginCheck.errors.length) {
    return res.render('auth/login', {
      autenticado: true,
      pagina: 'Iniciar Sesion',
      errores: loginCheck.errors,
      csrfToken: req.csrfToken(),
      usuario: {
        password: req.body.password,
        email: req.body.email,
      },
    })
  }

  try {
    const usuario = await prisma.usuario.findFirst({
      where: {
        email,
      },
    })

    if (usuario === null) {
      return res.render('auth/login', {
        autenticado: true,
        pagina: 'Iniciar Sesion',
        errores: [{ msg: 'Usuario no registrado' }],
        csrfToken: req.csrfToken(),
        usuario: {
          password: req.body.password,
          email: req.body.email,
        },
      })
    }
    if (usuario.confirmado !== true) {
      return res.render('auth/login', {
        autenticado: true,
        pagina: 'Iniciar Sesion',
        errores: [{ msg: 'Cuanta no ha sido confirmada' }],
        csrfToken: req.csrfToken(),
        usuario: {
          password: req.body.password,
          email: req.body.email,
        },
      })
    }

    const verify = await argon2.verify(usuario.password, password)

    if (verify === false) {
      return res.render('auth/login', {
        autenticado: true,
        pagina: 'Iniciar Sesion',
        errores: [{ msg: 'Password Incorrecta' }],
        csrfToken: req.csrfToken(),
        usuario: {
          password: req.body.password,
          email: req.body.email,
        },
      })
    }

    const token = jwtGenerator({ id: usuario.id, nombre: usuario.nombre })
    return res
      .cookie('_token', token, {
        httpOnly: true,
        // secure: true,
      })
      .redirect('/mis-propiedades')
  } catch (error) {
    console.log(error)
  }

  return res.render('auth/login', {
    autenticado: true,
    pagina: 'Iniciar Sesion',
    errores: loginCheck.errors,
    csrfToken: req.csrfToken(),
    usuario: {
      password: req.body.password,
      email: req.body.email,
    },
  })
}

export const formularioSignUp = async (req, res) => {
  res.render('auth/sign-up', {
    autenticado: true,
    pagina: 'Iniciar Sesion',
    csrfToken: req.csrfToken(),
  })
}

export const formularioOlvidarContraseña = async (req, res) => {
  res.render('auth/olvide-password', {
    csrfToken: req.csrfToken(),
    pagina: 'Recuperar tu acceso a Bienes Raices',
  })
}
export const registro = async (req, res) => {
  const { nombre, email, password, repetir_password } = req.body

  const checkUserData = await userValidations(req)

  if (checkUserData.errors.length !== 0) {
    return res.render('auth/sign-up', {
      pagina: 'Crear Cuenta',
      errores: checkUserData.errors,
      csrfToken: req.csrfToken(),
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
        errores: [{ msg: 'Email ya esta registrado ' }],
        csrfToken: req.csrfToken(),
        usuario: {
          nombre: req.body.nombre,
          password: req.body.password,
          email: req.body.email,
          repetir_password: req.body.repetir_password,
        },
      })
    }

    const token = generarToken()
    const passwordHasheada = await argon2.hash(password)
    const newUser = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: passwordHasheada,
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

export const confirmar = async (req, res) => {
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
}

export const resetPassword = async (req, res) => {
  const { email } = req.body
  const checkPasswordData = await passwordValidations(req)

  if (checkPasswordData.errors.length !== 0) {
    return res.render('auth/olvide-password', {
      pagina: 'Reestablecer Contraseña',
      errores: checkPasswordData.errors,
      csrfToken: req.csrfToken(),
      usuario: {
        email: req.body.email,
      },
    })
  }

  try {
    const checkUser = await prisma.usuario.findFirst({
      where: {
        email,
      },
    })

    if (checkUser === null) {
      return res.render('auth/olvide-password', {
        pagina: 'Reestablecer Contraseña',
        errores: [{ msg: 'Email NO esta registrado' }],
        csrfToken: req.csrfToken(),
        usuario: {
          email: req.body.email,
        },
      })
    }
    const token = generarToken()

    await prisma.usuario.update({
      where: {
        email,
      },
      data: {
        token,
      },
    })

    await enviarEmailPassword({
      nombre: checkUser.nombre,
      email: checkUser.email,
      token: token,
    })

    res.render('auth/mensaje', {
      pagina: 'Correo para reestablecer la contraseña enviado',
      mensaje:
        'Hemos enviado un Email , presiona el enlace en el correo para reestablecer y continuar.',
    })
  } catch (error) {
    console.log(error)
  }
}

export const comprobarToken = async (req, res) => {
  const { token } = req.params

  try {
    const user = await prisma.usuario.findFirst({
      where: {
        token,
      },
    })
    console.log(user)

    if (user === null) {
      return res.render('auth/mensaje', {
        pagina: 'Usuario no encontrado',
        mensaje: 'Usuario No encontrado o link caduco.',
      })
    }
  } catch (error) {
    console.log(error)
  }

  res.render('auth/reset-password', {
    pagina: 'Reestablecer Contraseña',
    csrfToken: req.csrfToken(),
    token: req.params.token,
    usuario: {
      password: req.body.password,
      repetir_password: req.body.repetir_password,
    },
  })
}

export const nuevoPassword = async (req, res) => {
  const { password, repetir_password } = req.body
  const { token } = req.params

  const checkPassword = await resetValidations(req)
  console.log(checkPassword)

  if (checkPassword.errors.length) {
    return res.render('auth/reset-password', {
      pagina: 'Reestablecer Contraseña',
      errores: checkPassword.errors,
      csrfToken: req.csrfToken(),
      token: req.params.token,
      usuario: {
        password: req.body.password,
        repetir_password: req.body.repetir_password,
      },
    })
  }

  try {
    const passwordHasheada = await argon2.hash(password)
    const user = await prisma.usuario.findFirst({
      where: {
        token: token,
      },
    })

    if (!user) {
      return res.render('auth/reset-password', {
        pagina: 'Reestablecer Contraseña',
        errores: [{ msg: 'Usuario NO encantrado o link caducado' }],
        csrfToken: req.csrfToken(),
        token: req.params.token,
        usuario: {
          password: req.body.password,
          repetir_password: req.body.repetir_password,
        },
      })
    }

    await prisma.usuario.update({
      where: {
        id: user.id,
      },
      data: {
        password: passwordHasheada,
        token: null,
      },
    })

    res.render('auth/mensaje', {
      pagina: 'Reseteado',
      mensaje:
        'Hemos enviado un Email de confirmacion, presiona el enlace en el correo para confirmar y continuar.',
    })
  } catch (error) {
    console.log(error)
  }
}
