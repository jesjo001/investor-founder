import Role from "../model/role";

/**
 * Class for Role related operations such Create role, Get role and others
 */

class roleController {
    static async createRole(req, res) {
        try {
            // Get role from body
            const { name } = req.body;
            const Admin = await Role.create({ name })
            // send a success message to the client
            return res.status(200).json(
                {
                    status: 200,
                    Admin
                }
            );
        } catch (e) {
            // watch errors
            console.log(e)
            return res.status(500).json({status: 500, message: "Server Error, Try again later.."});
        }
    }

    static async getRole(req, res) {
            try {
                // Get all Admin Roles
                const getAllRoles = await Role.find()
                // send a success message to the client
                return res.status(200).json(
                    {
                        status: 200,
                        getAllRoles
                    }
                );
            } catch (e) {
                // watch errors
                return res.status(500).json({status: 500, message: "Server Error, Try again later.."});
            }
        }
}

export default roleController;
