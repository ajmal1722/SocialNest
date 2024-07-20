import cloudinary from 'cloudinary';
import dotevn from 'dotenv'
dotevn.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

export default cloudinary.v2;