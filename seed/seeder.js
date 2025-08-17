import categories from './categorias.js'
import precios from './Precios.js'
import usuarios from './usuarios.js'
import argon2 from 'argon2'
import prisma from '../database/db.js'

const usuarioSeeder = async () => {
  try {
    const hashedUsers = await Promise.all(
      usuarios.map(async (item) => {
        const hashedPassword = await argon2.hash(item.password)
        return {
          ...item,
          password: hashedPassword,
        }
      })
    )
    return hashedUsers
  } catch (error) {
    console.error('Error en usuarioSeeder:', error)
    throw error
  }
}

const seeder = async () => {
  const newUsuarios = await usuarioSeeder()
  try {
    await Promise.all([
      prisma.categoria.createMany({
        data: categories,
        skipDuplicates: true,
      }),
      prisma.precio.createMany({
        data: precios,
        skipDuplicates: true,
      }),
      prisma.usuario.createMany({
        data: newUsuarios,
        skipDuplicates: true,
      }),
    ])
    console.log('done')
  } catch (error) {
    console.log(error)
  }
}

seeder()
