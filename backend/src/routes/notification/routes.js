import express from 'express';
import { protect } from '../../middlewares/authentication/auth';
import { PostNotification,OFFLINESENDTOMAIL} from '../../controllers/v1/Notification/notification';
import { getUserNotifications,NotificationCount,UpdateNotification,ClearAllNotification} from '../../controllers/v1/Notification/getNotification';

//End
const NotificationRouter = express.Router();
NotificationRouter.use(protect);
NotificationRouter.get('/', getUserNotifications);
NotificationRouter.post('/', PostNotification);
NotificationRouter.post('/OfflineMail', OFFLINESENDTOMAIL);
NotificationRouter.get('/Count',NotificationCount)
NotificationRouter.get('/UpdateView/:id',UpdateNotification)
NotificationRouter.get('/Clear',ClearAllNotification)




export default NotificationRouter;
