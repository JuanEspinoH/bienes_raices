import multer from 'multer'
import path from 'path'
import { generarToken } from '../utils/generarToken.js'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/img/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

export default upload
