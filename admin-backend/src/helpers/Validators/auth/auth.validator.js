import { check, validationResult } from 'express-validator';
import AuthServices from '../../../services/auth.services';

/**
 *Contains Auth Validator
 *
 *
 *
 * @class AuthValidator
 */
class AuthValidator {

  /**
   * validate user data.
   * @memberof SignUp
   * @returns {null} - No response.
   */
  static validateSignUp() {
    return [
      check('fullName')
        .exists()
        .withMessage('Fullname is required')
        .not()
        .isEmpty()
        .withMessage('Fullname  cannot be empty')
        .isLength({ min: 3 })
        .withMessage('Fullname  should be at least 3 characters long')
        .trim()
        .escape(),
      check('email')
        .exists()
        .withMessage('Email is required')
        .not()
        .isEmpty()
        .withMessage('Email cannot be empty')
        .isEmail()
        .withMessage('Email should be a valid email address'),
      check('password')
        .exists()
        .withMessage('Password is required')
        .not()
        .isEmpty()
        .withMessage('Password cannot be empty')
        .isLength({ min: 6 })
        .withMessage('Password should be at least 6 characters long')
        .trim()
        .escape(),
      check('phone')
        .exists()
        .withMessage('Phone number is required')
        .not()
        .isEmpty()
        .withMessage('Phone number  cannot be empty')       
        .trim()
        .escape(),
        check('department')
        .exists()
        .withMessage('Department is required')
        .not()
        .isEmpty()
        .withMessage('Department  cannot be empty')       
        .trim()
        .escape(),
    ];
  }

  /**
     * validate user data.
     * @memberof Login
     * @returns {null} - No response.
     */
  static validateLogin() {
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
