import express from 'express';
import fileUploadController from '../controllers/fileUpload.controller';
import upload from '../middlewares/fileUpload/upload';
import {protect} from "../middlewares/authentication/auth";
const ImageRouter = express.Router();

ImageRouter.use(protect)
ImageRouter.post(
  '/',
  upload.single('avatar'),
  fileUploadController.uploadAvatar
);


export default ImageRouter;
