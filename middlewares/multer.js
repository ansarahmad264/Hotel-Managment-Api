import multer from 'multer';
import fs from 'fs';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'public', 'temp');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create the directory if it doesn't exist
    fs.mkdir(uploadDir, { recursive: true }, (err) => {
      if (err) {
        return cb(err, uploadDir);
      }
      cb(null, uploadDir);
    });
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage,
});
