import multer from "multer";
import { cloudinaryStorage } from "./cloudinary-storage";
// import { cloudinaryStorage } from "./cloudinaryStorage";

export const upload = multer({ storage: cloudinaryStorage });
