// middleware/uploads.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.gif', '.mp4', '.mov'].includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only images and videos are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
