import multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
    destination: function (req:Request, file, cb) {
      cb(null, "images")
    },
    filename: function (req:Request, file, cb) {
      cb(null, `${Date.now()}_${file.originalname.replace(/\s+/g, "_")}`)
    },
  });

  const upload = multer({ storage: storage })
  export default upload

  