import jwt from 'jsonwebtoken'

const jwtGenerator = (datos) => {
  return jwt.sign(datos, process.env.AUTH_SECRET, {
    expiresIn: '30d',
  })
}

export default jwtGenerator
