import Events from '../../../models/events';
import User from '../../../models/user';
import { sendMail } from '../../../utils/mail';
import { emailTemplates } from '../../../utils/email-templates/emails';

export const invitationNotification = async (req, res) => {
  // get event that match the event id and is yet to happen.
  const upComingEvent = await Events.find({
    'date.from': {
      $lte: Date.now(),
      _id: req.body.eventId,
    },
  });

  //things to do if there is no matching event.
  if (upComingEvent.length < 1)
    return res
      .status(422)
      .json({ message: 'No event was scheduled today.', success: false });

  // find receiver that is active and send a notification
  const activeUsers =
    req.body.isActive === true &&
    (await User.find({ _id: req.body.receiverId }));

  if (activeUsers) {
    return res.status(200).json({ upComingEvent, success: true });
  }

  const inActiveUser =
    req.body.isActive === false &&
    (await User.findOne({ _id: req.body.receiverId }, ['_id', 'email']));

  const getSenderName = await User.findOne({ _id: req.body.sender }, ['name']);

  const templateId = emailTemplates.DYNAMIC_TEMPLATE;
  const dynamicTemplateData = {
    dynamicBody: `You have invited ${
      activeUsers && activeUsers.name
        ? activeUsers.name
        : inActiveUser && inActiveUser.name
        ? inActiveUser.name
        : null
    } to the ${upComingEvent.name} by ${
      getSenderName.name
    }. Click on the following <a href=${
      req.header.origin
    }/notification>Link</a> to get to your notification`,
  };

  // send mail to the non active users to notify them of the invitation
  await sendMail(inActiveUser.email, 'Event Invitation', templateId, dynamicTemplateData);

  return res.status(200).json({
    message: 'Invitation sent',
    status: true,
  });
};
