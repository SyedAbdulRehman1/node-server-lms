import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinary } from './cloudinary.provider';

export const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'courses', // Folder name in your Cloudinary account
    format: async () => 'jpeg', // Example format
    public_id: (req: any, file: any) => `${Date.now()}-${file.originalname}`, // File name
  } as any, // Explicit type cast
});
