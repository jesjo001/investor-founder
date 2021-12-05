import express from 'express';
import roleController from '../controllers/role.controller';
import { protect } from '../middlewares/authentication/auth'
const roleRouter = express.Router();

roleRouter.post('/role', roleController.createRole);
roleRouter.get('/role', roleController.getRole);
export default roleRouter;
