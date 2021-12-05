import s3delete from '../middlewares/fileUpload/delete';
import User from "../model/adminUsers";

class fileUploadController {

  static async uploadAvatar(req, res) {
    try {
      const users = await User.findById(req.user.id);
      const data = {
        avatar: req.file.location,
        avatarAwsDetails: req.file,
      };
      const user = req.user;
      if (users.avatar && users.avatarAwsDetails) {
        const photoData = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: users.avatarAwsDetails.key,
        };
        await s3delete(photoData);
      }
      await User.updateOne({ 'id': users._id },
          { $set: { profileImage: data } });
      return res.status(200).json(
          {
            status: 200,
            "message": 'Avatar Updated Successfully',
            "Image":data.avatar
          }
      );
    } catch (e) {
      return res.status(500).json({ status: 500, message: "Server Error, Try again later.."});
    }
  }
}

export default fileUploadController;
