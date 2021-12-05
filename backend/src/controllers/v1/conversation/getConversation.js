import Conversation from '../../../models/conversation';
import Message from '../../../models/message';

// returns the list of emails that the current user has any history of conversations
export const getConversations = async (req, res, next) => {
  try {
    const conversation = await Conversation.find({
      participants: { $in: req.user.id },
    })
      .populate('participants')
      .exec();
    return res.status(200).send(conversation);
  } catch (e) {
    console.log(e);
    return res.status(500).end();
  }
};

export const getConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findById(req.params.conversationId)
      .populate('participants')
      .exec();
    return res.status(200).send(conversation);
  } catch (e) {
    console.log(e.message);
    return res.status(500).end();
  }
};

export const getMyConversations = async (req, res, next) => {
  try {
    const conversation = await Conversation.aggregate([
      {
        $match: {
          participants: { $in: [req.user.id] },
        },
      },
      {
        $project: {
          _id: 1,
          participants: {
            $filter: {
              input: '$participants',
              as: 'participant',
              cond: {
                $ne: ['$$participant', req.user.id],
              },
              // cond: { $ne: ['$this', req.user.id] },
            },
          },
          createdAt: 1,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'participants',
          foreignField: '_id',
          as: 'participants',
        },
      },
    ]);
    return res.status(200).send(conversation);
  } catch (e) {
    console.log(e.message);
    return res.status(500).end();
  }
};

export const deleteConversation = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    //remove messages attached to the conversation.
    await Message.deleteMany({ conversationId });

    //delete conversation
    await Conversation.deleteOne({ _id: conversationId });

    return res
      .status(200)
      .send({ message: 'Conversation was successfully deleted' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
