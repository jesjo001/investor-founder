import express from 'express';
const messagingRouter = express.Router();
import { getMessage } from '../../controllers/v1/message/getMessage';
import { postMessage } from '../../controllers/v1/message/postMessage';
import { _preMessage } from '../../controllers/v1/message/preMessage';
import { streamMessage } from '../../controllers/v1/message/streamMessage';
import { protect } from '../../middlewares/authentication/auth';
import {MessageRequest} from '../../controllers/v1/message/msgRequest'
messagingRouter.use(protect);
messagingRouter.get('/:conversationId', _preMessage, getMessage);
messagingRouter.get('/stream/:conversationId', _preMessage, streamMessage);
messagingRouter.post('/:conversationId', _preMessage, postMessage);
messagingRouter.post('/message_request/:receiver',MessageRequest)
export default messagingRouter;
