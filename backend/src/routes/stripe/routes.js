import { Router } from 'express';
import { makePayment } from '../../controllers/v1/stripe/stripe';

const router = Router();
router.post('/', makePayment);

export default router;
