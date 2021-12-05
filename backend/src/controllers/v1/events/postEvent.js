import Events from '../../../models/events';
import { Notification } from '../../../models/notification';
import User from '../../../models/user';
import { sendMail } from '../../../utils/mail';
import { emailTemplates } from '../../../utils/email-templates/emails';

//create an event notification from an online user
export const postEvents = async (req, res) => {
  // destructure req.body props
  const {
    name,
    desc,
    availability,
    category,
    image,
    to,
    from,
    hostName,
    specialization,
    workPlace,
    country,
    state,
    venue,
  } = req.body;
  try {
    // create new events
    const newNotification = await Events.create({
      name,
      desc,
      availability,
      createdBy: req.user.id,
      category,
      date: {
        from,
        to,
      },
      hosts: {
        hostName,
        specialization,
        workPlace,
      },
      address: {
        country,
        state,
        venue,
      },
      resource: {
        image: image,
      },
    });

    // get sender role , name and id
    const getSendersRoleAndName = await User.findOne({ _id: req.user.id }, [
      'role',
      'name',
      '_id',
    ]);

    //message to sent to the users mail
    const message = `A new Event have been posted on your muonClub account by muonClub team
    check the event <a href='https://muon.club/event/${newNotification._id}'/></a>  for details and other notice.`;

    // find receiver that is active and send a notification
    // const activeUsers = await User.find({ isActive: true });

    // if (activeUsers)
    //   return res.status(200).json({ newNotification, success: true });

    // find users that are inactive to send them a mail
    const inActiveUser = await User.find({ isActive: false }, ['_id', 'email']);

    // loop through the inactive user, get they emails ant notify them till the last inactive user

    const templateId = emailTemplates.DYNAMIC_TEMPLATE;
    const dynamicTemplateData = {
      dynamicBody: message,
    };

    inActiveUser.forEach(async ({ email }) => {
      await sendMail(
        email,
        'New Event Notification',
        templateId,
        dynamicTemplateData
      );
    });

    // create new notification
    await Notification.create({
      sender: {
        Id: getSendersRoleAndName._id,
        fullName: getSendersRoleAndName.name,
        role: getSendersRoleAndName.role,
      },
      receiverId: 'all',
      message: message,
      type: 'EVENT_NOTIFICATION',
      mailed: true,
    });

    // send a success message to the client
    return res.status(200).json({
      message: 'You have successfully created an event.',
      success: true,
    });
  } catch (error) {
    // watch errors
    console.error(error);
  }
};

//JOIN EVENT
export const joinevent = async (req, res) => {
  try {
    const { eventID } = req.body;
    //INSERT USER INTO EVENT DATABASE
    //GET USERNAME
    const getUsername = await User.findOne({ _id: req.user.id })
      .select('name')
      .lean()
      .exec();
    const getEvent = await Events.findOne({ _id: eventID })
      .select('name')
      .lean()
      .exec();
    if (!getUsername) {
      return null;
    }
    if (!getEvent) {
      return null;
    }
    const add_userTO_event = await Events.updateOne(
      { _id: eventID },
      {
        $addToSet: {
          guests: {
            userId: req.user.id,
            guestName: getUsername.name,
            role: req.user.role,
          },
        },
      }
    );
    let message = `your request to join Event '${getEvent.name}' was successfully registered stay tuned for more info 
    about this event`;

    const templateId = emailTemplates.DYNAMIC_TEMPLATE;
    const dynamicTemplateData = {
      dynamicBody: message,
    };
    if (add_userTO_event) {
      sendMail(req.user.email, 'Event Registration', templateId, dynamicTemplateData);

      // Create Notification
      const notificationMessage = `Your have successfully joined the '${getEvent.name}' Event. Please stay tuned for more info 
    on '${getEvent.name}' Event`;

      const createNotification = await new Notification({
        sender: {
          fullName: getEvent.name,
          role: getEvent.role,
        },
        receiverId: req.user.id,
        blogLink: getEvent.id,
        message: `${notificationMessage}`,
        type: 'JOIN_EVENT',
        mailed: true,
        view: 0,
      });

      await createNotification.save();
      return res.status(200).send({ message: 'registration successfull' });
    }
    return res.status(400).send({ error: 'error registering you' });
  } catch (e) {
    console.log(e.message);
  }
};
