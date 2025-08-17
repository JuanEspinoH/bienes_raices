import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
})

export const enviarEmail = async ({ email, token, nombre }) => {
  const info = await transporter.sendMail({
    from: 'BienesRaices.com',
    to: email,
    subject: 'Confirma tu Cuenta de BienesRaices.com. ',
    text: 'Confirma tu Cuenta de BienesRaices.com. ',
    html: `
        
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmacion de cuenta</title>
      </head>
      <body>
          <h1>Hola ${nombre}</h1>
          <p>Confirma tu Cuenta em BienesRaices.com en este link:
          <a href=
          "${process.env.BACKEND_URL}${
      process.env.PORT ?? 3000
    }/auth/confirmar/${token}"
          ><strong>Confirma AQUI.</strong> </a>
          </p>
      </body>
</html>
      `,
  })

  return info
}
export const enviarEmailPassword = async ({ email, token, nombre }) => {
  const info = await transporter.sendMail({
    from: 'BienesRaices.com',
    to: email,
    subject: 'Recupera la contraseña tu Cuenta de BienesRaices.com. ',
    text: 'Recupera la contraseña tu Cuenta de BienesRaices.com. ',
    html: `
        
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Recuperar contraseña </title>
      </head>
      <body>
          <h1>Hola ${nombre}</h1>
          <p>Recupera tu contraseña de BienesRaices.com en este link:
          <a href=
          "${process.env.BACKEND_URL}${
      process.env.PORT ?? 3000
    }/auth/resetear-password/${token}"
          ><strong>Reestablecer  AQUI.</strong> </a>
          </p>
      </body>
</html>
      `,
  })

  return info
}
export const enviarEmailPasswordReset = async ({ email, token, nombre }) => {
  const info = await transporter.sendMail({
    from: 'BienesRaices.com',
    to: email,
    subject: 'Recupera la contraseña tu Cuenta de BienesRaices.com. ',
    text: 'Recupera la contraseña tu Cuenta de BienesRaices.com. ',
    html: `
        
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Recuperar contraseña </title>
      </head>
      <body>
          <h1>Hola ${nombre}</h1>
          <p>Recupera tu contraseña de BienesRaices.com en este link:
          <a href=
          "${process.env.BACKEND_URL}${
      process.env.PORT ?? 3000
    }/auth/resetear-password/${token}"
          ><strong>Reestablecer  AQUI.</strong> </a>
          </p>
      </body>
</html>
      `,
  })

  return info
}
