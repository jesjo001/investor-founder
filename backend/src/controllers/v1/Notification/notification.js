import Connection from '../../../models/connection';
import Conversation from '../../../models/conversation';
import Events from '../../../models/events';
import { Notification } from '../../../models/notification';
import User from '../../../models/user';
import { sendMail } from '../../../utils/mail';
import { NotificationType } from '../../../utils/NotificationType';
import { emailTemplates } from '../../../utils/email-templates/emails';

//insert notification for user check if user is active
//if yes send notification to database and emit to user
//else get mail and mail notification to user and then insert to database.

//NOTIFICATION FOR MESSAGE REQUEST
export const PostNotification = async (req, res, next) => {
  try {
    // get sender details
    const filterSenderDetails = await User.findOne({ _id: req.body.sender });
    const filterRecieverDetails = await User.findOne({ _id: req.user.id });
    switch (true) {
      case req.body.eventType === 'PROFILE_NOTIFICATION':
        //check if a notification with same details exist in the database if yes no need to insert
        let checkNotificationForProfile = await Notification.findOne({
          'sender.id': filterSenderDetails._id,
          receiverId: req.user.id,
          type: req.body.eventType,
        });
        if (checkNotificationForProfile) {
          return null;
        }
        //else insert to database
        const createForProfile = await new Notification({
          sender: {
            fullName: filterSenderDetails.name,
            id: filterSenderDetails._id,
            role: filterSenderDetails.role,
          },
          receiverId: req.user.id,
          blogLink: req.body.sender,
          message: `${filterSenderDetails.name} recently viewed your profile.`,
          type: req.body.eventType,
          mailed: false,
          view: 0,
        });
        const saveForProfile = await createForProfile.save();
        res.status(200).send(saveForProfile);
        break;
      case req.body.eventType === 'CONNECT_USERS':
        //check if users are connected already
        const checkConnection = await Connection.findOne({
          $or: [
            {
              'receiver.userId': req.user.id,
              'sender.userId': req.body.sender,
            },
          ],
        });
        // there is a connection do nothing
        if (checkConnection) {
          return null;
        }

        // if the receiver does not exist or deleted do nothing
        if (!filterRecieverDetails) {
          return null;
        }

        // create a connection for one user
        const createConnection = await new Connection({
          sender: {
            userId: req.body.sender,
            role: filterSenderDetails.role,
            name: filterSenderDetails.name,
          },
          receiver: {
            userId: req.user.id,
            role: filterRecieverDetails.role,
            name: filterRecieverDetails.name,
          },
        });
        const saveNewConnection = await createConnection.save();
        //insert notification to the {receiver that someon just connected with them if the connection is  successfull
        if (!saveNewConnection) {
          return null;
        }
        const createForConnection = await new Notification({
          sender: {
            fullName: filterSenderDetails.name,
            id: filterSenderDetails._id,
            role: filterSenderDetails.role,
          },
          receiverId: req.user.id,
          blogLink: req.body.sender,
          message: `${filterSenderDetails.name} just made a connection with you.`,
          type: req.body.eventType,
          mailed: false,
          view: 0,
        });
        const saveForConnection = await createForConnection.save();
        res.status(200).send(saveForConnection);
        break;
      case req.body.eventType === 'EVENT_INVITATION':
        const getEventDetailsINVITE = await Events.findOne({
          _id: req.body.eventLink,
        })
          .select('name')
          .lean()
          .exec();

        const createForInvite = await new Notification({
          sender: {
            fullName: filterSenderDetails.name,
            id: filterSenderDetails._id,
            role: filterSenderDetails.role,
          },
          receiverId: req.user.id,
          blogLink: req.body.eventLink,
          message: `${filterSenderDetails.name} just invited you for an event ${getEventDetailsINVITE.name}.`,
          type: req.body.eventType,
          mailed: false,
          view: 0,
        });
        const saveForInvite = await createForInvite.save();
        res.status(200).send(saveForInvite);
        break;

      case req.body.eventType === 'JOIN_EVENT':
        const getEventDetails = await Events.findOne({
          _id: req.body.eventLink,
        })
          .select('name')
          .lean()
          .exec();
        //check if a notification with same details exist in the database if yes no need to insert
        const createForJOINInvite = await new Notification({
          receiverId: req.user.id,
          blogLink: req.body.eventId,
          message: `your request for joining event '${getEventDetails.name}' was registered successfully.`,
          type: req.body.eventType,
          mailed: false,
          view: 0,
        });
        const saveForJoinInvite = await createForJOINInvite.save();
        res.status(200).send(saveForJoinInvite);
        break;
      default:
        return res.status(500).send({ message: 'server error' });
    }
  } catch (error) {
    console.log(error.message);
  }
};

//NOTIFICATION FOR OFFLINE LOOKUP
export const OFFLINESENDTOMAIL = async (req, res, next) => {
  try {
    //get sender details
    const filterSenderDetails = await User.findOne({ _id: req.user.id });
    const filterRecieverDetails = await User.findOne({
      _id: req.body.receiverId,
    });

    switch (true) {
      case req.body.eventType === 'MESSAGE_REQUEST':
        send_Mail(
          req.body.receiverId,
          'Message request',
          emailTemplates.DYNAMIC_TEMPLATE,
          {
            dynamicBody: `${filterSenderDetails.name} sent you a message via muonClub`,
          },
          req.body.eventType
        );
        res.status(200).send({ mailed: true });
        break;

      case req.body.eventType === 'PROFILE_NOTIFICATION':
        //check if a notification with same details exist in the database if yes no need to insert
        let checkNotificationForProfile = await Notification.findOne({
          'sender.id': req.user.id,
          receiverId: req.body.receiverId,
          type: req.body.eventType,
        });
        if (checkNotificationForProfile) {
          return null;
        }
        if (req.user.id === null) {
          return null;
        }
        const createForProfile = await new Notification({
          sender: {
            fullName: filterSenderDetails.name,
            id: req.user.id,
            role: filterSenderDetails.role,
          },
          receiverId: req.body.receiverId,
          blogLink: req.user.id,
          message: `${filterSenderDetails.name} recently viewed your profile.`,
          type: req.body.eventType,
          mailed: true,
          view: 0,
        });
        const saveForProfile = await createForProfile.save();
        if (saveForProfile) {
          send_Mail(
            req.body.receiverId,
            'Someone Viewed Your Profile',
            emailTemplates.DYNAMIC_TEMPLATE,
            {
              dynamicBody: `someone recently viewed your profile on muonClub, check to see more activities on your account.`,
            },
            req.body.eventType
          );
          res.status(200).send({ mailed: true });
        }
        break;

      case req.body.eventType === 'EVENT_INVITATION':
        const getEventDetailsINVITE = await Events.findOne({
          _id: req.body.eventLink,
        })
          .select('name')
          .lean()
          .exec();
        const createForInvite = await new Notification({
          sender: {
            fullName: filterSenderDetails.name,
            id: filterSenderDetails._id,
            role: filterSenderDetails.role,
          },
          receiverId: req.body.receiverId,
          blogLink: req.body.eventLink,
          message: `${filterSenderDetails.name} just invited you for an event ${getEventDetailsINVITE.name}.`,
          type: req.body.eventType,
          mailed: true,
          view: 0,
        });
        const saveForInvite = await createForInvite.save();
        if (saveForInvite) {
          send_Mail(
            req.body.receiverId,
            'Invitation to join event',
            emailTemplates.DYNAMIC_TEMPLATE,
            {
              dynamicBody: `${filterSenderDetails.name} just invited you for an event, check to see more activities on your account.`
            },
            req.body.eventType
          );
          return res.status(200).send({ mailed: true });
        }
        break;
      case req.body.eventType === 'CONNECT_USERS':
        //check if users are connected already
        const checkConnection = await Connection.findOne({
          $or: [
            {
              'receiver.userId': req.body.receiver,
              'sender.userId': req.user.id,
            },
          ],
        });
        // there is a connection do nothing
        if (checkConnection) {
          return null;
        }
        // if the receiver does not exist or deleted do nothing
        if (!filterRecieverDetails) {
          return null;
        }
        //create a connection for one user
        const createConnection = await new Connection({
          sender: {
            userId: req.user.id,
            role: filterSenderDetails.role,
            name: filterSenderDetails.name,
          },
          receiver: {
            userId: req.body.receiverId,
            role: filterRecieverDetails.role,
            name: filterRecieverDetails.name,
          },
        });
        const saveNewConnection = await createConnection.save();
        //insert notification to the {receiver that someon just connected with them if the connection is  successfull
        if (!saveNewConnection) {
          return null;
        }
        const createForConnection = await new Notification({
          sender: {
            fullName: filterSenderDetails.name,
            id: filterSenderDetails._id,
            role: filterSenderDetails.role,
          },
          receiverId: req.body.receiverId,
          blogLink: req.user.id,
          message: `${filterSenderDetails.name} just made a connection with you.`,
          type: req.body.eventType,
          mailed: true,
          view: 0,
        });
        const saveForConnection = await createForConnection.save();
        if (saveForConnection) {
          send_Mail(
            req.body.receiverId,
            'New Connection',
            emailTemplates.DYNAMIC_TEMPLATE,
            {
              dynamicBody: `someone just connected with you, login to your muonclub to checkout more activities on your muon club account.`,
            },
            req.body.eventType
          );
          res.status(200).send({ mailed: true });
        }
        break;
      default:
        return res.status(500).send({ message: 'server error' });
    }
  } catch (error) {
    console.log(error.message);
  }
};

//NOTIFICATION LOGIN AND LOGIN ATTEMPT
export const LOGIN = async (event, ip, receiverID) => {
  try {
    //get sender details

    switch (true) {
      case event === 'LOGIN':
        // send_Mail(receiverID, '', `a login activity was recently made on your muonClub account.`, event)
        send_Mail(
          receiverID,
          'New Login Activity',
          emailTemplates.DYNAMIC_TEMPLATE,
          {
            dynamicBody:
              'A login activity was recently made on this muonclub account',
          },
          event
        );
        console.log({ mailed: true });
        break;

      case event === 'LOGIN_ATTEMPT':
        send_Mail(
          receiverID,
          'New Login Attempt',
          emailTemplates.DYNAMIC_TEMPLATE,
          {
            dynamicBody: `Someone just tried to login to your muonClub account with the following ip :${ip}`,
          },
          event
        );
        console.log({ mailed: true });
        break;
      default:
        return res.status(500).send({ message: 'server error' });
    }
  } catch (error) {
    console.log({ message: error.message });
  }
};

//SEND MAIL
async function send_Mail(receiverID, subject, templateId, dynamic_template_data) {
  const filterReceiverInfo = await User.findOne({ _id: receiverID });
  sendMail(filterReceiverInfo.email, subject, templateId, dynamic_template_data);
}
//END SEND MAIL

//END New function
