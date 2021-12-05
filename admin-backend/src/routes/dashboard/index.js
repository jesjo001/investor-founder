import express from 'express';
import { getStatistics } from '../../controllers/dashboard/getStatistics';

const DashboardRouter = express.Router();

DashboardRouter.get('/statistics', getStatistics)

export default DashboardRouter;
