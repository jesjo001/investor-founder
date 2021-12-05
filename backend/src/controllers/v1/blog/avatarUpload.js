import Blog from '../../../models/blog';
import s3delete from '../../../middlewares/fileUpload/delete';

/**
 * Class for users related operations such Sign UP, Sign In and others
 */
class uploadBlogPhoto {
    /**
     * Upload an image to s3, this does not delete an image in s3
     * @param {Object} req The request object
     * @param {Object} res The response object
     * @returns {Object} A user can uplaod an image
     */
    static async uploadAvatar(req, res) {
        try {
            const { blogId } = req.query;
            const blog = await Blog.findById(blogId);
            const blogPhoto= {
                avatar: req.file.location,
                avatarAwsDetails: req.file,
            };
            if (blog.avatar && blog.avatarAwsDetails) {
                const photoData = {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: blog.avatarAwsDetails.key,
                };
                await s3delete(photoData);
            }
            await Blog.updateOne({ 'id': blog._id },
                { $set: { profileImage: blogPhoto } });
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

export default uploadBlogPhoto;
