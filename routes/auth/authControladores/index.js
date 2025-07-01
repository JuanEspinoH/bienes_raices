import prisma from '../../../database/db.js'

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

  console.log(req.body)
  try {
    const newUser = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password,
      },
    })
    console.log(newUser)
  } catch (error) {
    console.log(error)
  }

  res.render('auth/sign-up', { autenticado: true, pagina: 'Crear Cuenta' })
}
