import Auth from "../../../models/user";
import { newToken } from '../../../middlewares/authentication/auth.newToken';
import Helper from "../../../utils/talent/user.utils";
import AuthServices from '../../../services/talent/auth.services';

/**
 *Contains Auth Controller
 *
 *
 *
 * @class AuthController
 */
class AuthController {

  /**
   * Login user.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof AuthController
   * @returns {JSON} - A JSON success response.
   */
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await AuthServices.emailExist(email, res);
      const confirmPassword = await Helper.verifyPassword(
        password,
        user.password
      );
      if (!confirmPassword || !user) {
        return res.status(401).json({
          status: "401 Unauthorized",
          error:
            "Invalid Login details.",
        });
      }

      const token = newToken({
        id: user._id,
        email: user.email,
        role: 'Talent',
      });

      return res.status(200).json({
        status: "success",
        data: {
          token,
          user,
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: "500 Internal server error",
        error:
          "Error logging in user",
      });
    }
  }
  
  /**
   * Update user.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof AuthController
   * @returns {JSON} - A JSON success response.
   */
   static async update(req, res) {
    try { 
      const user = await Auth.findOne({
        _id: req.user.id,
      });

      if (req.body.name) {
        user["name"] = req.body.name;
      }
     //role shouldn't be updated -->remove later
      if (req.body.role) {
        user["role"] = req.body.role;
      }
      await user.save();
      // populate other fields

      const token = newToken({
        id: user._id,
        email: user.email,
        role: 'Talent',
      });

      return res.status(200).json({
        status: "success",
        data: {
          token,
          user
        },
      });
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        status: "500 Internal server error",
        error:
          "Error updating user record",
      });
    }
  }
  /**
  * Create account for a user.
  * @param {Request} req - Response object.
  * @param {Response} res - The payload.
  * @memberof AuthController
  * @returns {JSON} - A JSON success response.
  */
  static async signUp(req, res) {
    try {
      const user = await Auth.create(req.body);
      const token = newToken({
        id: user._id,
        email: user.email,
        role: 'Talent',
      });

      return res.status(201).json({
        status: "success",
        data: {
          token,
          user,
        },
      });
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        status: "500 Internal server error",
        error: "Error creating new user",
      });
    }
  }


}
export default AuthController;