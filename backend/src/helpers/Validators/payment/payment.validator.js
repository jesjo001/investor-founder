import { check, validationResult } from 'express-validator';

/**
 *Contains Payment Validator
 *
 *
 *
 * @class Payment
 */
class PaymentValidator {
  /**
     * validate payment payload
     * @memberof Payment
     * @returns {null} - No response.
     */
  static validatePaymentData() {
    return [
      check('id')
        .exists()
        .withMessage('ID is required')
        .trim()
        .not()
        .isEmpty()
        .withMessage('ID cannot be empty'),
      check('amount')
        .exists()
        .withMessage('Amount is required')
        .not()
        .isEmpty()
        .withMessage('Amount cannot be empty')
        .trim()
        .escape(),
      check('userId')
        .exists()
        .withMessage('User ID is required')
        .not()
        .isEmpty()
        .withMessage('User ID cannot be empty')
        .trim()
        .escape(),
      check('planId')
        .exists()
        .withMessage('Plan ID is required')
        .not()
        .isEmpty()
        .withMessage('Plan ID cannot be empty')
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


}
export default PaymentValidator;
