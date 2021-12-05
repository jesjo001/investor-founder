import express from 'express';
import { approveFounder } from '../../controllers/founder/approveFounder'
import { deleteFounder } from '../../controllers/founder/deleteFounder';
import { deletePending } from '../../controllers/founder/deletePendingFounder';
import { denyPending } from '../../controllers/founder/denyFounder';
import { getFounders } from '../../controllers/founder/getFounders'
import { getUnapproved } from '../../controllers/founder/getUnappproveFounders'
import { protect } from '../../middlewares/authentication/auth'
const FounderRouter = express.Router();

FounderRouter.get('/getfounders', getFounders)
FounderRouter.use(protect)
FounderRouter.post('/approve/:id', approveFounder)
FounderRouter.delete('/delete/:id', deleteFounder)
FounderRouter.delete('/deletepending/:id', deletePending)
FounderRouter.delete('/denypending/:id', denyPending)
FounderRouter.get('/unapproved', getUnapproved)

export default FounderRouter;
