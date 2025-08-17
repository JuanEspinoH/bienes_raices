import { v2 as cloud } from 'cloudinary'

cloud.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const cloudinaryUploadingImg = async (file) => {
  let result
  try {
    result = await cloud.uploader.upload(file)

    return result
  } catch (error) {
    console.error(error)
  }
}

export default cloudinaryUploadingImg
