import express from 'express';
import eventController from '../controllers/event.controller';
import {protect} from "../middlewares/authentication/auth";
import upload from "../middlewares/fileUpload/upload";
const EventRouter = express.Router();

EventRouter.get('/events', eventController.getEvents);
EventRouter.use(protect);
EventRouter.post('/events', upload.single('avatar'), eventController.createEvents);
EventRouter.get('/events/:id',  eventController.getOneEvents);
EventRouter.delete('/events/:id',  eventController.deleteEvents);
export default EventRouter;
