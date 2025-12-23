import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/Cloudinary.js'; // Import from your utils file

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'restaurant-uploads', // The name of the folder in Cloudinary 
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'], // Limit file types
}});

export const upload = multer({
  storage,
});
