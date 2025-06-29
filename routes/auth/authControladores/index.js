export const formularioLogin = async (req, res) => {
  res.render('auth/login', { autenticado: true })
}

export const formularioSignUp = async (req, res) => {
  res.render('auth/sign-up', { autenticado: true, pagina: 'Crear Cuenta' })
}
