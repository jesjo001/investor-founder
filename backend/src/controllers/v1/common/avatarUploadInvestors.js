import Investor from "../../../models/user";
import s3delete from "../../../middlewares/fileUpload/delete";

/**
 * Class for users related operations such Sign UP, Sign In and others
 */
class fileUploadController {
    /**
     * Upload an image to s3, this does not delete an image in s3
     * @param {Object} req The request object
     * @param {Object} res The response object
     * @returns {Object} A user can uplaod an image
     */
    static async investorsAvatar(req, res) {
        try {
            const users = await Investor.findById(req.user.id);
            const data = {
                avatar: req.file.location,
                avatarAwsDetails: req.file,
            };

            if (users.avatar && users.avatarAwsDetails) {
                const photoData = {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: users.avatarAwsDetails.key,
                };
                await s3delete(photoData);
            }
            await Investor.updateOne({ 'id': users._id },
                { $set: { profileImage: data } });
            return res.status(200).json(
                {
                    status: 200,
                    "message": 'Avatar Updated Successfully',
                    "Image":data.avatar
                }
            );
        } catch (e) {
            console.log(e)
            return res.status(500).end(e);
        }
    }
}

export default fileUploadController;
