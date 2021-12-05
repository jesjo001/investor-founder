import express from 'express';
const founderRouter = express.Router();
import { charge } from '../../controllers/v1/founder/charge.js';
import { refer } from '../../controllers/v1/founder/founder.refers.js';
import { updateProfile } from '../../controllers/v1/founder/founder.updateProfile.js';
import { getFounderPlan } from '../../controllers/v1/founder/getFounder.js';
import { getStartUpCount } from '../../controllers/v1/founder/getStartUpCount.js';
import { protect } from '../../middlewares/authentication/auth.js';

import { ExternalFounderSignup } from '../../controllers/v1/founder/pendingFounder';
import AuthValidator from '../../helpers/Validators/founder/auth.validator';

founderRouter.post(
  '/pending-signup',
  AuthValidator.customDate,
  AuthValidator.validateSignupData(),
  AuthValidator.myValidationResult,
  AuthValidator.emailAlreadyExist,
  AuthValidator.emailAlreadyExistInTempFoundersRecord,
  ExternalFounderSignup
);
founderRouter.post('/updateprofile', protect, updateProfile);
// founderRouter.post('/updateplan', updatePlan);
founderRouter.use(protect);
founderRouter.post('/charge', charge);
founderRouter.post('/refer', refer);
founderRouter.get('/startupcount', getStartUpCount);
founderRouter.get('/plan-status', getFounderPlan);

export default founderRouter;
