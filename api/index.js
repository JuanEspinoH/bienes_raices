import dotenv from 'dotenv'
import express from 'express'
import { sql } from '@vercel/postgres'

dotenv.config()
const app = express()

// Create application/x-www-form-urlencoded parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('public'))
app.set('x-powered-by', false)

app.get('/', function (req, res) {
  res.send('OKey 11')
})

app.listen(3000, () => console.log('Server ready on port 3000.'))

export default app
