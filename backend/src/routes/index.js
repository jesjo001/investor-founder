import express from 'express';
const router = express.Router();
import googleAuthRouter from '../middlewares/authentication/googleAuth.js';
import investorRouter from './investor/routes.js';
import founderRouter from './founder/routes.js';
import messagingRouter from './message/routes.js';
import conversationRouter from './conversation/routes.js';
import commonRouter from './common/routes.js';
import NotificationRouter from './notification/routes.js';
import EventRouter from './events/routes.js';
import BlogRouter from './blog/routes.js';
import CommentRouter from './blogComment/routes';
import TalentRouter from './talent/auth.route';
import PaymentRouter from './payment/payment.route';
import StripeRouter from './stripe/routes.js';

router.use('/founder', founderRouter);
router.use('/payment', PaymentRouter);
router.use('/talent/auth', TalentRouter);
router.use(commonRouter);
router.use('/auth', googleAuthRouter);
router.use('/investor', investorRouter);
router.use(founderRouter);
router.use('/messaging', messagingRouter);
router.use('/conversation', conversationRouter);
router.use('/Notification', NotificationRouter);
router.use('/events', EventRouter);
router.use('/blogs', BlogRouter);
router.use('/comment', CommentRouter);
router.use('/stripe-payment', StripeRouter);

export default router;
