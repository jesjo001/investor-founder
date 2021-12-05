import Conversation from '../../../models/conversation';
import Message from '../../../models/message';
import { Notification } from '../../../models/notification';
import User from '../../../models/user';

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = User.findById(id);
    if (!user) return res.status(404).send({ message: 'User not found' });
    console.log(id);
    const getConversations = await Conversation.find({
      participants: { $in: [id] },
    });

    const removeMessages = await Message.deleteMany({ sender: id });

    const updateConversation =
      getConversations &&
      getConversations.map(async conversation => {
        try {
          if (conversation && conversation.participants.length > 2) {
            console.log('update');
            const up = await Conversation.findOneAndUpdate(
              { _id: conversation._id },
              {
                $pull: {
                  participants: id,
                },
              }
            );
            console.log('up:', up);
          }
          if (conversation && conversation.participants.length <= 2) {
            console.log('dele');
            const de = await Conversation.deleteOne({ _id: conversation._id });
            console.log(de);
          }
        } catch (error) {
          console.log(error.message);
        }
      });

    // const getNotification = await Notification.find({
    //   $or: [{ receiverId: id }, { 'sender.id': id }],
    // });

    await Notification.deleteMany({
      $or: [{ receiverId: id }, { 'sender.id': id }],
    });

    await User.deleteOne({ _id: id }, { new: true });

    return res.status(200).send({ message: 'Account deleted successfully ' });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
