import express from 'express';
const EventRouter = express.Router();
import { getAllEvents,getEventById } from '../../controllers/v1/events/getAllEvents';
import { postEvents,joinevent } from '../../controllers/v1/events/postEvent';
import { protect } from '../../middlewares/authentication/auth';

EventRouter.get('/event/:id',getEventById)
EventRouter.use(protect);
EventRouter.post('/create-event', postEvents)
EventRouter.get('/getall-events', getAllEvents);
EventRouter.post('/join_event',joinevent)

export default EventRouter;
