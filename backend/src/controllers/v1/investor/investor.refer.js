import { startSession } from 'mongoose';
import { Refer } from '../../../models/rest';
import { mailData } from '../founder/utils/referLogic';
import Investor from '../../../models/investor';
import User from '../../../models/user';
import Founder from '../../../models/founder';

export const refer = async (req, res) => {
 
  const getUserDetail = await User.findOne({ email: req.user.email }); //get the details of the user loggedin
  if (!req.body.email && !req.body.type && req.body.name) {
    return res.status(422).send({
      error: 'Please make sure you enter all details',
      success: false,
    });
  }

  //Check if user is already referred if yes update the date and resend mail to them
  const referred = await Refer.findOne({ email: req.body.email }).lean().exec();
  const checkUserIfExit = await User.findOne({ email:req.body.email }) //check to see if the refered user is already a member
 
  
  if (req.body.email === req.user.email) {
    return res
      .status(200)
      .send({ error: `you can't refer yourself`, success: false });
  }

  if(checkUserIfExit){
    return res.status(200).send({ error: `This person is already a user.`, success: false, });
  }

  if (referred) {
   const UpdateRefer = await Refer.updateOne({email:req.body.email},{$set:{updatedAt:Date.now()}})
   mailData(req.user.email, req.body.email, getUserDetail.name,req.body.type);
   return res.status(200).send({ message: 'Invitation send', success: true });
  }

 
  let temp, session;
  // check if the refered user is an investor or a founder use the switch statement to loop through
  switch (true) {
    case req.user.role === 'Investor':
      try {
        // trying to send mail
        // modifying relevant database documents
        session = await startSession();
        session.startTransaction();
        await Refer.create(
          [
            //adding reference for user
            {
              name: req.body.name,
              email: req.body.email,
              referredBy: req.user.id,
              status: 'invited',
              refererType: req.body.type,
            },
          ],
          { session }
        );
        temp = await Refer.findOne({ email: req.body.email }).session(session);
        await Investor.findByIdAndUpdate(req.user.id, {
          $push: { referred: [temp._id] },
        }).session(session);

        await session.commitTransaction();
        session.endSession();
        mailData(req.user.email, req.body.email, getUserDetail.name,req.body.type);
        return res.status(200).send({ message: 'Invitation send', success: true });
      } catch (e) {
        console.log(e);
        // await session.abortTransaction();
        // session.endSession();
        console.log(e);
        res.status(500).end();
      }

      break;
    //Founders
    case req.user.role === 'Founder':
      //Check if founder is eligible to refer
      try {
        const founder = await User.findById(req.user.id).exec();

        // check if a founder have the refered property
        if (founder && founder.referred && founder.referred.length >= 10) {
          return res
            .status(403)
            .send({ error: 'Referral limit reached.', success: false });
        }

        // response to the user with no refered property yet.
        res.status(404).json({
          error: 'It seems you are yet to start referring.',
          success: false,
        });

        
        // modifying relevant database documents
        session = await startSession();
        session.startTransaction();
        await Refer.create(
          [
            //adding reference for user
            {
              name: req.body.name,
              email: req.body.email,
              referredBy: req.user.id,
              status: 'invited',
              refererType:  req.body.type,
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
        // trying to send mail
        mailData(req.user.email, req.body.email, getUserDetail.name, req.body.type);
        res.status(200).send({ message: 'Invitation sent', success: true });
      } catch (e) {
        console.log(e);
        await session.abortTransaction();
        session.endSession();
      }
      break;
    default:
      res.status(500).send('data not confirmed');
      break;
  }
};
