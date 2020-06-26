const express = require('express');
const multer = require('multer');
const fs = require('fs');

const uploadsRouter = express.Router();
const upload = multer({
  dest: 'public/',
});

uploadsRouter.post('/image', upload.single('image'), async (req, res) => {
  // console.log(req.file);

  // validate
  const fileTypeRegex = /\.(jpg|jpeg|png)$/i;
  const maxFileSize = 2000000;
  if (!fileTypeRegex.test(req.file.originalname)) {
    res.status(400).json({
      success: false,
      message: 'Only allowed JPG, JPEG and PNG file!',
    });
    fs.unlinkSync(req.file.path);
  } else if (req.file.size > maxFileSize) {
    res.status(400).json({
      success: false,
      message: 'File must be less than 2Mb!',
    });
    fs.unlinkSync(req.file.path);
  } else {
    // rename file
    const filenameParts = req.file.originalname.split('.');
    const fileType = filenameParts[filenameParts.length - 1];
    const filename = `${req.file.filename}.${fileType}`;
    fs.renameSync(req.file.path, `public/${filename}`);

    res.status(200).json({
      success: true,
      data: {
        imageUrl: `/${filename}`,
      }
    });
  }
});

module.exports = uploadsRouter; 