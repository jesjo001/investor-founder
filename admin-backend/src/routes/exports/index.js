import express from 'express';
import { exportAwaitingFounders } from '../../controllers/exports/exportAwaitingFounders';
import { exportBlogs } from '../../controllers/exports/exportBlogs';
import { exportFounders } from '../../controllers/exports/exportFounders';
import { exportInvestors } from '../../controllers/exports/exportInvestors';
import { exportEvents } from '../../controllers/exports/exportEvents';

const ExportsRouter = express.Router();

ExportsRouter.get('/blogs', exportBlogs)
ExportsRouter.get('/founders', exportFounders)
ExportsRouter.get('/investors', exportInvestors)
ExportsRouter.get('/founders/unapproved', exportAwaitingFounders)
ExportsRouter.get('/events', exportEvents)
// ExportsRouter.get('/blogs', exportBlogs)

export default ExportsRouter;
