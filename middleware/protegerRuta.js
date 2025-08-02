import jwt from 'jsonwebtoken'
import prisma from '../database/db.js'

const protegerRuta = async (req, res, next) => {
  const { _token } = req.cookies
  if (!_token) {
    return res.redirect('/auth/login')
  }

  try {
    const decode = jwt.verify(_token, process.env.AUTH_SECRET)
    const ususario = await prisma.usuario.findFirst({
      where: {
        id: decode.id,
      },
      omit: {
        password: true,
        createdAt: true,
        token: true,
        updatedAt: true,
        confirmado: true,
      },
    })
    if (ususario) {
      req.usuario = ususario
    } else {
      return res.redirect('/auth/login')
    }

    return next()
  } catch (error) {
    return res.clearCookie('_token').redirect('/auth/login')
  }
}

export default protegerRuta
