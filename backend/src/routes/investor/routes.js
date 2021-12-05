import express from 'express';
import { getInvestor } from '../../controllers/v1/investor/getInvestor';
import { refer } from '../../controllers/v1/investor/investor.refer';
import { updateProfile } from '../../controllers/v1/investor/updateProfile';
import { protect } from '../../middlewares/authentication/auth';

const investorRouter = express.Router();
investorRouter.use(protect);
investorRouter.post('/updateprofile', updateProfile);
investorRouter.post('/refer', refer);
investorRouter.get('/getInvestors', protect, getInvestor);

export default investorRouter;
