import { Router } from "express";
import PaymentController from "../../controllers/v1/payment/payment.controller";
import PaymentValidator from "../../helpers/Validators/payment/payment.validator";

const router = Router();

// get payment plans
router.get(
  "/",
  PaymentController.getPaymentPlans
);

// process payment
router.post(
  "/process-payment",
  PaymentValidator.validatePaymentData(),
  PaymentValidator.myValidationResult,
  PaymentController.processPayment
);


export default router;