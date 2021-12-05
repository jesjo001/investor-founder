import Admin from "../model/adminUsers";
import Events from "../model/events";

/**
 * Class for Admin/Employee related operations such Create user, Sign In and others
 */

class userController {
    static async getUser(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 100;
            const skipIndex = (page - 1) * limit;

            const count = await Admin.countDocuments({})

            // Get all Admin User
            const getAllAdmin = await Admin.find()
                .sort({createdAt: -1})
                .limit(limit)
                .skip(skipIndex)
                .exec();
            // send a success message to the client
            return res.status(200).json(
                {
                    status: 200,
                    count,
                    getAllAdmin
                }
            );
        } catch (e) {
            // watch errors
            return res.status(500).json({status: 500, message: "Server Error, Try again later.."});
        }
    }

    static async deleteUser(req, res) {
        try {
            const admin = await Admin.findByIdAndDelete({_id: req.params.id})
            if (!admin) return res.status(404).send('User not found');
            return res.status(200).json({
                "status": 200,
                'message': "Admin deleted successfully"
            })
        } catch (e) {
            return res.status(500).json({status: 500, message: "Server Error, Try again later.."});
        }
    }
}

export default userController;
