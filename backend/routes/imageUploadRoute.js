import path from "path";
import express from "express";
import multer from "multer";
const imageUploadRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "../uploads");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

imageUploadRouter.post("/", upload.single("image"), (req, res) => {
  var correctedPath = path.normalize(req.file.path);

  console.log(correctedPath);

  var ret = correctedPath.replace("data-", "");

  res.send(`/${req.file.path}`);
});

export default imageUploadRouter;