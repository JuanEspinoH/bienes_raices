import multer from 'multer'
import path from 'path'
import { generarToken } from '../utils/generarToken.js'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../public/uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, generarToken() + path.extname(file.originalname))
  },
})

const upload = multer({ storage })

export default upload
