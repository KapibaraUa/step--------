import multer from "multer";
import path from "node:path";
 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("public", "images"));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
 
    cb(null, uniqueName);
  },
});
 
const upload = multer({ storage });
export default upload;