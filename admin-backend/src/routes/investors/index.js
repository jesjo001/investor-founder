import express from 'express';
import { deleteInvestors } from '../../controllers/investors/deleteInvestor';
import { getInvestors } from '../../controllers/investors/getInvestors';

const InvestorRouter = express.Router();

InvestorRouter.get('/', getInvestors)
InvestorRouter.delete('/:id', deleteInvestors)

export default InvestorRouter;
