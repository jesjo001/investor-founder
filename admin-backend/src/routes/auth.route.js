import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import AuthValidator from "../helpers/Validators/auth/auth.validator";
import { protect } from '../middlewares/authentication/auth';

const router = Router();

router.post(
  "/signup",
  protect,
  AuthValidator.validateSignUp(),
  AuthValidator.myValidationResult,
  AuthValidator.emailAlreadyExist,
  AuthController.signUp
);

router.post(
  "/login",
  AuthValidator.validateLogin(),
  AuthValidator.myValidationResult,
  AuthController.login
);

router.get(
  "/load-user",
  protect,
  AuthController.loadUser
);

export default router;
