import multer from 'multer';
import Founder from '../../../models/founder';
import { uploader } from '../../../middlewares/mediaMiddlewares/uploads';

export const updateProfile = async (req, res) => {
  // check the type of data that was sent
  let typeUpdate = req.headers['content-type'];
  console.log(typeUpdate);

  try {
    // things to do if is a json data
    if (typeUpdate.includes('application/json')) {
      let myObject = Object.assign({}, req.body);
      delete myObject.referred;
      delete myObject.role;
      const result = await Founder.findByIdAndUpdate(req.user.id, {
        $set: {
          ...myObject,
        },
      }).exec();

      // send a success respond to the client
      return res.status(200).send({ message: 'Profile updated' });
    } else {
      let filename = '';
      let upload = multer({ storage: uploader('uploads/') }).single(
        'profileImage'
      );

      // uploading profile
      upload(req, res, async function (err) {
        if (req.file) {
          filename = req.file.filename;
        }
        let myObject = Object.assign({}, req.body);
        delete myObject.referred;
        delete myObject.role;
        const result = await Founder.findByIdAndUpdate(req.user.id, {
          $set: {
            ...myObject,
            profileImage: req.file?.path,
          },
        }).exec();

        return res.status(200).send({ message: 'Profile updated' });
      });
    }
  } catch (err) {
    return res.status(500).end();
  }
};
