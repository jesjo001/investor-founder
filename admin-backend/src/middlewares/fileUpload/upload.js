// CONFIGURATION OF S3
import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import dotenv from 'dotenv'


dotenv.config();

AWS.config.update({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
const S3 = new AWS.S3();
// CREATE MULTER FUNCTION FOR UPLOAD
const upload = multer({
  // CREATE MULTER-S3 FUNCTION FOR STORAGE
  storage: multerS3({
    s3: S3,
    acl: 'public-read',
    // bucket - WE CAN PASS SUB FOLDER NAME ALSO LIKE 'bucket-name/sub-folder1'
    bucket: process.env.AWS_BUCKET_NAME,
    // META DATA FOR PUTTING FIELD NAME
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    // SET / MODIFY ORIGINAL FILE NAME
    key(req, file, cb) {
      cb(null, `${new Date().toISOString()}-${file.originalname}`);
    },
  }),

  // SET DEFAULT FILE SIZE UPLOAD LIMIT
  limits: { fileSize: 1024 * 1024 * 15 }, // 15MB

  // FILTER OPTIONS LIKE VALIDATING FILE EXTENSION
  fileFilter(req, file, cb) {

    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb('Error: Allow images only of extensions jpeg|jpg|png!');
  },
});

export default upload;
