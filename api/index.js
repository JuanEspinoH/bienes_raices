import dotenv from 'dotenv'
import express from 'express'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'

dotenv.config()

import authRouter from '../routes/auth/index.js'

const app = express()
app.set('x-powered-by', false)
app.set('trust proxy', true)
app.set('view engine', 'pug')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())
app.use(csrf({ cookie: true }))

app.use('/auth', authRouter)

app.get('/', function (req, res) {
  res.send('OKey 11')
})
// app.get('/auth/login', function (req, res) {
//   res.render('auth/login')
// })

app.listen(3000, () => console.log('Server ready on port 3000.'))

export default app
