import { Router } from "express";
import AuthController from "../../controllers/v1/talent/auth.controller";
import AuthValidator from "../../helpers/Validators/talent/auth.validator";
import {protect} from '../../middlewares/authentication/auth'

const router = Router();

// talent profile login
router.post(
  "/login",
  AuthValidator.validateLoginData(),
  AuthValidator.myValidationResult,
  AuthController.login
);

// talent profile update
router.put(
  "/update",
  protect,
  AuthController.update
);

// talent profile signup
router.post(
  "/signup",
  AuthValidator.validateSignupData(),
  AuthValidator.myValidationResult,
  AuthValidator.emailAlreadyExist,
  AuthController.signUp
);



export default router;