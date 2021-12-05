import multer from 'multer';
import Investor from '../../../models/investor';

export const updateProfile = async (req, res) => {
  let typeUpdate = req.headers['content-type'];
  console.log(typeUpdate);
  try {
    if (typeUpdate.includes('application/json')) {
      let myObject = Object.assign({}, req.body);
      delete myObject.referred;
      delete myObject.role;
      const result = await Investor.findByIdAndUpdate(req.user.id, {
        $set: {
          ...myObject,
        },
      }).exec();
      return res.status(200).send({ message: 'Profile updated' });
    } else {
      let filename = '';
      let upload = multer({ storage: uploader('uploads/') }).single(
        'profileImage'
      );
      upload(req, res, async function (err) {
        if (req.file) {
          filename = req.file.filename;
        }
        let myObject = Object.assign({}, req.body);
        delete myObject.referred;
        delete myObject.role;
        const result = await Investor.findByIdAndUpdate(req.user.id, {
          $set: {
            ...myObject,
            profileImage: req.file?.path,
          },
        }).exec();
        return res.status(200).send({ message: 'Profile updated' });
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).status(500).end();
  }
};
