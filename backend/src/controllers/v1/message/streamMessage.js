import eventEmitter, { generateSendSseCallback } from '../../../utils/emitter';

export const streamMessage = async (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  try {
    const sendSse = generateSendSseCallback(
      req.params.conversationId,
      req.user.id,
      res
    );
    eventEmitter.on('newMessage', sendSse);
    req.on('close', () => {
      eventEmitter.removeListener('newMessage', sendSse);
    });
  } catch (err) {
    console.log(`[SERVER] an error occured on /stream: ${err}`);
    return res.status(500);
  }
};
