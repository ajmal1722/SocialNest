import cloudinary from "../utils/cloudinary.js";
import upload from "../utils/multer.js";

const uploadFile = async (req, res, next) => {
    upload.single('image')(req, res, next) 
}