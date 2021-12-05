import Conversation from '../../../models/conversation';
import Founder from '../../../models/founder';
import { preConversationSwitch } from './utils/preConversionSwitch';

export const preConversation = async (req, res, next) => {
  try {
    // lets allow investor to access without any plan
    if (req.user.role === 'Investor') {
      next();
    } else {
      const user = await Founder.findById(req.user.id).lean().exec();
      const planType = user.plan;
      const planDate = user.planDate;
      const getConversations = await Conversation.find({
        participants: { $in: req.user.id },
      });
      const conversations = getConversations.filter(
        participant => participant.participants.length <= 2
      );
      if (!planType && conversations.length >= 5) {
        return res
          .status(402)
          .send({ message: 'Please select a valid plan type' });
      } else {
        let currentDate = new Date();
        let Difference_In_Time =
          currentDate.getTime() - planDate ? planDate.getTime() : 0;
        let Difference_In_Days = Math.floor(
          Difference_In_Time / (1000 * 3600 * 24)
        );
        await preConversationSwitch({ Difference_In_Days, planType, res });
      }
      next();
    }
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
};
