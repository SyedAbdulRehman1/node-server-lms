import * as multer from "multer";

declare global {
  namespace Express {
    interface User {
      id: string;
      // Add other properties if needed
    }
    interface Request {
      file?: Multer.File;
    }
  }
}
