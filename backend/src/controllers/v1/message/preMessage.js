import Conversation from '../../../models/conversation';

export const _preMessage = async (req, res, next) => {
  // check if conversation exists
  try {
    if (req.params.conversationId === null) {
      return res.status(400).send({ message: 'Conversation Id is required' });
    }
    const conversation = await Conversation.findById(
      req.params.conversationId
    ).exec();

    if (conversation === null) {
      return false;
    }

    // check if the requester have engage in any conversion with the other user
    if (!conversation.participants.includes(req.user.id)) {
      return res.status(400).json({
        message: 'You are yet to engage in any conversion with this user.',
        success: false,
      });
    }

    return next();
  } catch (e) {
    console.log(e.message);
    return false;
  }
};
