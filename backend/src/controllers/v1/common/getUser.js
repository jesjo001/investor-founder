import User from '../../../models/user';
import {Notification} from "../../../models/notification";

export const getUsers = async (req, res) => {
  // works based on req.query.name
  try {
    const data = await User.find({
      name: { $regex: new RegExp('.*' + req.query.name + '.*'), $options: 'i' },
    })
      .select('email name profileImage role _id')
      .lean()
      .exec();
    res.send(data);
  } catch (e) {
    res.status(500).end();
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const data = await User.findOne({ _id: req.params.id }).exec();
    if (!data) {
      return res.status(404).send('not found');
    }

    // Create Notification
    let me
    me = !(req.user.name) ? 'Someone' : req.user.name
    const notificationMessage = `${me} viewed your profile`;

    const createNotification = await new Notification({
      sender: {
        fullName: me,
        role: req.user.role,
      },
      receiverId: data.id,
      blogLink: req.user.id,
      message: `${notificationMessage}`,
      type: 'PROFILE_NOTIFICATION',
      mailed: false,
      view: 0
    });

    await createNotification.save();
    return res.status(200).send(data);
  } catch (error) {
    res.status(500).end();
  }
};
