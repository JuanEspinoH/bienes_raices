import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import path from 'path'
import { v2 as cloud } from 'cloudinary'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const parentDir = dirname(__dirname)
const grandParentDir = dirname(parentDir)
const imsPath = parentDir + '/public/img/uploads/'

cloud.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

function cloudinarySubirImagen() {
  const storage = new CloudinaryStorage({
    cloudinary: cloud,
    params: async (req, file) => {
      const folderPath = imsPath
      const fileExtension = path.extname(file.originalname).substring(1)
      const publicId = `${file.fieldname}-${Date.now()}`

      let result = {
        folder: 'propiedades',
        public_id: publicId,
        format: fileExtension,
      }

      return result
    },
  })

  return multer({
    storage: storage,
  })
}

export default cloudinarySubirImagen
