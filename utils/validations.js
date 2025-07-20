import { check, validationResult } from 'express-validator'

export const userValidations = async (req) => {
  await check('nombre')
    .notEmpty()
    .trim()
    .withMessage('El nombre no puede estar vacio')
    .isLength({ max: 20 })
    .withMessage('El nombre debe tener menos de 20 caracteres')
    .run(req)
  await check('email').isEmail().trim().withMessage('Email no valido').run(req)
  await check('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe de ser minimo 6 caracteres')
    .run(req)
  await check('repetir_password')
    .matches(req.body.password)
    .withMessage('Las contraseñas no coinciden')
    .run(req)

  return validationResult(req)
}

export const loginValidations = async (req) => {
  await check('email')
    .notEmpty()
    .withMessage('Campo Obligatorio')
    .isEmail()
    .trim()
    .withMessage('Email no valido')
    .run(req)

  await check('password')
    .notEmpty()
    .withMessage('Campo Obligatorio')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe de ser minimo 6 caracteres')
    .run(req)

  return validationResult(req)
}

export const resetValidations = async (req) => {
  console.log(req.body)
  await check('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe de ser minimo 6 caracteres')
    .run(req)
  await check('repetir_password')
    .equals(req.body.password)
    .withMessage('Las contraseñas no coinciden')
    .run(req)

  return validationResult(req)
}

export const passwordValidations = async (req) => {
  await check('email').isEmail().trim().withMessage('Email no valido').run(req)

  return validationResult(req)
}
