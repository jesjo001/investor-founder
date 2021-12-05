import { check, validationResult } from 'express-validator';
import AuthServices  from '../../../services/talent/auth.services'

/**
 *Contains Login Validator
 *
 *
 *
 * @class Login
 */
class AuthValidator {
  /**
     * validate user login data.
     * @memberof Login
     * @returns {null} - No response.
     */
  static validateLoginData() {
    return [
      check('email')
        .exists()
        .withMessage('Email is required')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Email cannot be empty'),
      check('password')
        .exists()
        .withMessage('Password is required')
        .not()
        .isEmpty()
        .withMessage('Password cannot be empty')
        .trim()
        .escape(),
    ];
  }

  /**
     * validate user signup data.
     * @memberof Login
     * @returns {null} - No response.
     */
  static validateSignupData() {
    return [
      check('email')
        .exists()
        .withMessage('Email is required')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Email cannot be empty'),
      check('password')
        .exists()
        .withMessage('Password is required')
        .not()
        .isEmpty()
        .withMessage('Password cannot be empty')
        .trim()
        .escape(),
      check('name')
        .exists()
        .withMessage('Name is required')
        .not()
        .isEmpty()
        .withMessage('Name cannot be empty')
        .trim()
        .escape(),
    ];
  }

  /**
   * Validate user data.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @param {Response} next - The next parameter.
   * @memberof Login
   * @returns {JSON} - A JSON success response.
   */
  static async myValidationResult(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errArr = errors.array().map(({ msg }) => msg);
      return res.status(400).json({
        status: '400 Invalid Request',
        error: 'Your request contains invalid parameters',
        errors: errArr,
      });
    }
    return next();
  }

  /**
   * Check whether email already exist.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @param {Response} next - The next parameter.
   * @memberof SignUp
   * @returns {JSON} - A JSON response.
   */
   static async emailAlreadyExist(req, res, next) {
    const { email } = req.body;
    const user = await AuthServices.emailExist(email, res);
    if (user) {
      return res.status(409).json({
        status: '409 Conflict',
        error: 'Email address already exists',
      });
    }
    return next();
  }
}
export default AuthValidator;
