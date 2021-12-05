import Conversation from '../../../models/conversation';
import User from '../../../models/user';
import { createConversationSwitch } from './utils/createConversationSwitch';

// create a conversation
export const createConversation = async (req, res, next) => {
  // check if the receiver is was sent along wit the request
  if (req.params.receiver === null) {
    return res.status(422).send({ message: 'Receiver expected' });
  }

  // lets see if the receiver exists
  const receiver = await User.findOne({ email: req.params.receiver });
  if (receiver === null) {
    return res.status(422).send({ message: 'Invalid receiver' });
  }

  // check if the sender exists in the conversation
  const conv = await Conversation.findOne({
    participants: { $in: req.user.id },
  });

  // verify if a user's plan have expired
  await createConversationSwitch({ plan: req.user.plan, conv });

  try {
    // lets see if conversation already exists
    const conversation = await Conversation.findOne({
      participants: {
        $all: [req.user.id, receiver._id],
      },
    }).exec();

    console.log(conversation)



    if (conversation !== null && conversation.participants.length === 2) {
      return res.status(200).send({ message: 'Conversation already created' });
    }
  } catch (e) {
    return res.status(500).end();
  }
  try {
    // create a conversation with the receiver
    conversation = await Conversation.create({
      participants: [req.user.id, receiver._id],
      createdBy: req.user.id,
    });
    return res.status(200).send(conversation);
  } catch (e) {
    return res.status(500).send({ message: 'Could not create conversation' });
  }
};

export const createGroupChat = async (req, res) => {
  try {
    const { participants } = req.body;
    const conversation = await Conversation.create({
      participants: [req.user.id, ...participants],
      createdBy: req.user.id,
    });
    return res.status(200).send(conversation);
  } catch (error) {
    return res.status(500).send({ message: 'Could not create group chat' });
  }
};

export const addParticipant = async (req, res) => {
  try {
    const { conversationId, participants } = req.body;
    const conversation = await Conversation.findByIdAndUpdate(
      { _id: conversationId },
      { $addToSet: { participants: participants } }
    ).populate('participants');
    return res.status(201).send(conversation);
  } catch (error) {
    return res.status(500).send({ message: error?.message });
  }
};

export const conversationParticipant = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const conversation = await Conversation.findById({
      _id: conversationId,
    }).populate('participants');
    return res.status(201).send(conversation);
  } catch (error) {
    return res.status(500).send({ message: error?.message });
  }
};

export const removeParticipant = async (req, res) => {
  try {
    const { conversationId, participantId } = req.params;
    console.log(req.params);
    const conversation = await Conversation.findByIdAndUpdate(
      { _id: conversationId },
      { $pull: { participants: participantId } },
      { new: true }
    ).populate('participants');
    return res.status(200).send(conversation);
  } catch (error) {
    return res.status(500).send({ message: error?.message });
  }
};

export const getAllParticipants = async (req, res) => {
  try {
    const participants = await Conversation.aggregate([
      { $match: { participants: { $in: [req.user.id] } } },
      { $project: { _id: 1, participants: 1 } },
      { $unwind: '$participants' },
      { $group: { _id: '$participants' } },
      {
        $match: {
          _id: {
            $ne: null,
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'participant',
        },
      },
      { $unwind: '$participant' },
      {
        $project: {
          'participant._id': 1,
          'participant.email': 1,
          'participant.name': 1,
          'participant.expertise': 1,
          'participant.stage': 1,
          'participant.createdAt': 1,
        },
      },
    ]);
    return res.status(200).send(participants);
  } catch (error) {
    return res.status(500).send({ message: error?.message });
  }
};
