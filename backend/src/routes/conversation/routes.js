import express from 'express';
const conversationRouter = express.Router();
import {
  createConversation,
  addParticipant,
  removeParticipant,
  createGroupChat,
  getAllParticipants,
  conversationParticipant,
} from '../../controllers/v1/conversation/createConversation';
import { preConversation } from '../../controllers/v1/conversation/preConversation';
import {
  getConversations,
  getMyConversations,
  getConversation,
  deleteConversation,
} from '../../controllers/v1/conversation/getConversation';
import { protect } from '../../middlewares/authentication/auth';

conversationRouter.use(protect);
conversationRouter.get('/', getConversations);
conversationRouter.get('/me', getMyConversations);
conversationRouter.get('/all-participants', getAllParticipants);
conversationRouter.get('/:conversationId', getConversation);
conversationRouter.get(
  '/:conversationId/participants',
  conversationParticipant
);
conversationRouter.post(
  '/create/:receiver',
  preConversation,
  createConversation
);
conversationRouter.post('/add-participants', addParticipant);
conversationRouter.post('/group-chat', createGroupChat);
conversationRouter.delete('/:conversationId/:participantId', removeParticipant);
conversationRouter.delete('/:conversationId', deleteConversation);

export default conversationRouter;
