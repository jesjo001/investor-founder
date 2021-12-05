import { startSession } from 'mongoose';
import multer from 'multer';
import { newToken } from '../../../middlewares/authentication/auth.newToken';
import { uploader } from '../../../middlewares/mediaMiddlewares/uploads';
import { Refer } from '../../../models/rest';
import User from '../../../models/user';
import Founder from '../../../models/founder';

// UPDATED
export const Foundersignup = async (req, res) => {


  let upload = multer({ storage: uploader('uploads/') });
  let uploadMultiple = upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
  ]);

  uploadMultiple(req, res, async function (err) {

    let filename = '';
    let files = Object.assign({}, req.files);
    if (!req.body.referredBy || !req.body.id) {
      return res.status(422).send({ message: 'Ids expected' });
    }
    // verifying validity of refer
    let idRef, referredByRef;
    try {
      idRef = await Refer.findOne({
        email: req.body.id,
      }).exec();
      if (idRef === null) {
        // oops, founder hasn't received a referral yet
        return res.status(400).send({ message: 'Invalid referral 1' });
      }
      if (idRef.status === 'registered') {
        return res.status(400).send({ message: 'Founder already registered' });
      }
      referredByRef = await User.findById(idRef.referredBy).exec();
      if (referredByRef === null) {
        return res.status(400).send({ message: 'Invalid referral 2' });
      }
      if (
        idRef.email !== req.body.id ||
        referredByRef.email !== req.body.referredBy
      ) {
        return res.status(400).send({ message: 'Invalid referral 3' });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).end();
    }
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (err) {
      return res.send(err);
    }
    if (req.file) {
      filename = req.file.filename;
    }

    // see if user already registered
    try {
      const user = await User.findOne({ email: idRef.email })
        .select('email')
        .exec();
      if (user) {
        return res.status(409).send({ message: 'user already registered' });
      }
    } catch (e) {
      console.log(e);
      res.status(500).end();
    }
    let session;
    try {
      session = await startSession();
      session.startTransaction();
      await Founder.create(
        [
          {
            email: idRef.email,
            name: req.body.full_name,
            password: req.body.password,
            expertise: req.body.expertise,
            industryType: req.body.industryType,
            established: req.body.startup_est_date,
            haveCofounders: req.body.has_co_founders,
            cofounder: req.body.cofounder,
            coolInfo: req.body.about_startup,
            source: req.body.source,
            startupName: req.body.startup_name,
            startupCountry: req.body.startup_country,
            stage: req.body.stage,
            ticketRaised: req.body.ticketRaised,
            ticketToRaise: req.body.ticketToRaise,
            investor: req.body.investor,
            deckLink: req.body.pitch_deck_link,
            officeAddress: req.body.office_address,
            profileImage: files.photo[0].path,
            referredBy: referredByRef._id,
            refererType: idRef.refererType,
            logo: files.length >0?files.logo[0].path:'null',
          },
        ],
        { session }
      );
      const user = await User.findOne({ email: idRef.email }).session(session);
      await Refer.findOneAndUpdate(
        {
          email: idRef.email,
          referredBy: referredByRef._id,
        },
        { status: 'registered' }
      ).session(session);
      const token = newToken({
        id: user._id,
        email: idRef.email,
        role: 'Founder',
      });
      await session.commitTransaction();
      session.endSession();
      return res.status(201).send('registration successfull');
    } catch (e) {
      console.log(e);
      await session.abortTransaction();
      session.endSession();
      return res.status(500).end();
    }
  });
};
