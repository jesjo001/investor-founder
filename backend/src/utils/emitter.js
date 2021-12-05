import { EventEmitter } from 'events';
import { _preMessage } from '../controllers/v1/message/preMessage';

const eventEmitter = new EventEmitter();

export const generateSendSseCallback =
  async (conversationId, userId, res) => async update => {
    let result = await _preMessage(conversationId, userId);
    if (result === true) {
      res.write(`data: ${JSON.stringify(update)}\n\n`);
    } else {
      res.end();
    }
  };

export default eventEmitter;
