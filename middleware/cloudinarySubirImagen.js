import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import path from 'path'
import { v2 as cloud } from 'cloudinary'

cloud.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

function uploadMiddleware(folderName) {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
      const folderPath = `${folderName.trim()}` // Actualizar la ruta de la carpeta aquí
      const fileExtension = path.extname(file.originalname).substring(1)
      const publicId = `${file.fieldname}-${Date.now()}`

      return {
        folder: folderPath,
        public_id: publicId,
        format: fileExtension,
      }
    },
  })

  return multer({
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024, // mantener el tamaño de las imágenes < 5 MB
    },
  })
}

export default cloudinarySubirImagen
