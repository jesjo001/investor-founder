import mongoose from 'mongoose';
import Founder from '../../../models/founder.js';
import { Refer } from '../../../models/rest.js';
import User from '../../../models/user.js';
import { connect } from '../../../utils/mail.js';
const { startSession } = mongoose;

import { mailData } from './utils/referLogic.js';

export const refer = async (req, res, next) => {
  if (!req.body.email) {
    return res.status(422).send({ message: 'Name and email expected' });
  }
  //Check if user is already referred
  try {
    const referred = await Refer.findOne({ email: req.body.email }).exec();
    if (referred !== null) {
      return res.status(200).send({ message: 'User already referred' });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).end();
  }
  //Check if founder is eligible to refer

  try {
    const founder = await User.findById(req.user.id).exec();
    // check if a founder have the refered property
    if (founder && founder.referred && founder.referred.length >= 10) {
      return res.status(403).send({ message: 'Referral limit reached.' });
    }

    // response to the user with no refered property yet.
    if (!founder.referred) {
      return res.status(404).json({
        message: 'It seems you are yet to start referring.',
        success: false,
      });
    }
  } catch (e) {
    return res.status(500).end('server error please try again later');
  }
  // trying to send email

  let temp, session;
  try {
    // trying to send mail
    mailData({ receiverEmail: req.body.email, referralEmail: req.user.email });

    // modifying relevant database documents
    session = await startSession();
    session.startTransaction();
    await Refer.create(
      [
        //adding reference for user
        {
          // name: req.body.name,
          email: req.body.email,
          referredBy: req.user.id,
          status: 'invited',
          refererType: 'Founder',
        },
      ],
      { session }
    );

    temp = await Refer.findOne({ email: req.body.email }).session(session);

    await Founder.findByIdAndUpdate(req.user.id, {
      $push: { referred: [temp._id] },
    }).session(session);

    await session.commitTransaction();
    session.endSession();

    return res.status(200).send({ message: 'Invitation send' });
  } catch (e) {
    console.log(e);
    await session.abortTransaction();
    session.endSession();

    return res.status(500).end();
  }
};
