import express from 'express';
import userController from '../controllers/user.controller';
import { protect } from '../middlewares/authentication/auth'
const UserRouter = express.Router();

UserRouter.use(protect);
UserRouter.get('/', userController.getUser);
UserRouter.delete('/:id', userController.deleteUser);
export default UserRouter;
