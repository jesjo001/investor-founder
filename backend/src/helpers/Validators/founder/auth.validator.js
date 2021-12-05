import { check, validationResult } from 'express-validator';
import AuthServices from '../../../services/talent/auth.services';
import moment from 'moment';
import {
  INDUSTRY_TYPE,
  TICKET_SIZE,
  FOUNDER_STAGE
} from '../../../utils/constants';

/**
 *Contains Login Validator
 *
 *
 *
 * @class Login
 */
class AuthValidator {
  /**
     * validate user signup data.
     * @memberof Login
     * @returns {null} - No response.
     */
  static validateSignupData() {
    return [
      check('fullName')
        .exists()
        .withMessage('Full name is required')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Full name cannot be empty'),
      check('email')
        .exists()
        .withMessage('Email is required')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Email cannot be empty')
        .isEmail()
        .withMessage('Please put a valid user email'),
      check('startUpName')
        .exists()
        .withMessage('Start-up name is required')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Start-up name cannot be empty'),
      check('established')
        .exists()
        .withMessage('Date established is required')
        .not()
        .isEmpty()
        .withMessage('Date established cannot be empty'),
      check('aboutUs')
        .exists()
        .withMessage('About us is required')
        .not()
        .isEmpty()
        .withMessage('About us cannot be empty')
        .trim()
        .escape(),
      check('companyEmail')
        .exists()
        .withMessage('Company Email is required')
        .not()
        .isEmpty()
        .withMessage('Company Email cannot be empty')
        .trim()
        .escape()
        .isEmail()
        .withMessage('Please put a valid company email'),
      check('companyAddress')
        .exists()
        .withMessage('Company Address is required')
        .not()
        .isEmpty()
        .withMessage('Company Address cannot be empty')
        .trim()
        .escape(),
      check('numOfCoFounders')
        .exists()
        .withMessage('Num Of Co Founders is required')
        .not()
        .isEmpty()
        .withMessage('Num Of Co Founders cannot be empty')
        .trim()
        .escape()
        .isInt()
        .withMessage('Number of Cofounder should be an integer'),
      check('companyStage')
        .exists()
        .withMessage('Company Stage is required')
        .not()
        .isEmpty()
        .withMessage('Company Stage cannot be empty')
        .trim()
        .escape()
        .custom(value => {
          if (!FOUNDER_STAGE.includes(value)) {
            return Promise.reject('Expected values for company stage are ' + FOUNDER_STAGE);
          }
          return true
        }),
      check('industryType')
        .exists()
        .withMessage('Industry Type is required')
        .not()
        .isEmpty()
        .withMessage('Industry Type cannot be empty')
        .trim()
        .escape()
        .custom(value => {
          if (!INDUSTRY_TYPE.includes(value)) {
            return Promise.reject('Expected values for industry type are ' + INDUSTRY_TYPE);
          }
          return true
        }),
      check('problemStatement')
        .exists()
        .withMessage('Problem Statement is required')
        .not()
        .isEmpty()
        .withMessage('Problem Statement cannot be empty')
        .trim()
        .escape(),
      check('companySolution')
        .exists()
        .withMessage('Company Solution is required')
        .not()
        .isEmpty()
        .withMessage('Company Solution cannot be empty')
        .trim()
        .escape(),
      check('whyOurCompany')
        .exists()
        .withMessage('WhyOurCompany is required')
        .not()
        .isEmpty()
        .withMessage('WhyOurCompany cannot be empty')
        .trim()
        .escape(),
      check('myCompetitors')
        .exists()
        .withMessage('myCompetitors is required')
        .not()
        .isEmpty()
        .withMessage('myCompetitors cannot be empty')
        .trim()
        .escape(),
      check('burnRate')
        .exists()
        .withMessage('Burn Rate is required')
        .not()
        .isEmpty()
        .withMessage('Burn Rate cannot be empty')
        .trim()
        .escape(),
      check('madeProfit')
        .exists()
        .withMessage('madeProfit is required')
        .not()
        .isEmpty()
        .withMessage('madeProfit cannot be empty')
        .trim()
        .escape(),
      check('amountRaised')
        .exists()
        .withMessage('Amount Raised is required')
        .not()
        .isEmpty()
        .withMessage('Amount Raised cannot be empty')
        .trim()
        .escape()
        .custom(value => {
          if (!TICKET_SIZE.includes(value)) {
            return Promise.reject('Expected values for amount raised are ' + TICKET_SIZE);
          }
          return true
        }),
      check('amountToRaise')
        .exists()
        .withMessage('Amount To Raise is required')
        .not()
        .isEmpty()
        .withMessage('Amount To Raise cannot be empty')
        .trim()
        .escape()
        .custom(value => {
          if (!TICKET_SIZE.includes(value)) {
            return Promise.reject('Expected values for amount to raise are ' + TICKET_SIZE);
          }
          return true
        }),
      check('fundAllocation')
        .exists()
        .withMessage('Fund Allocation is required')
        .not()
        .isEmpty()
        .withMessage('Fund Allocation cannot be empty')
        .trim()
        .escape(),
      check('milestones')
        .exists()
        .withMessage('Milestones is required')
        .not()
        .isEmpty()
        .withMessage('Milestones cannot be empty')
        .trim()
        .escape()    
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
   * Check whether email already exist in the main user model.
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
        error: 'Email address already exists in our record',
      });
    }
    return next();
  }


  /**
 * Check whether established custom date already exist in the main user model.
 * @param {Request} req - Response object.
 * @param {Response} res - The payload.
 * @param {Response} next - The next parameter.
 * @memberof SignUp
 * @returns {JSON} - A JSON response.
 */
  static async customDate(req, res, next) {

    try{
      let { established } = req.body;
  
      if (established.includes("/")) {
        established = established.replaceAll("/", "-");
      }

      if (!established.includes("-")) {
        return res.status(409).json({
          status: '409 Invalid Date Format',
          error: 'Invalid Date Format. -Date established Should be in the format (YYYY-MM)',
        });
      }
  
      if ((new Date(established)) == "Invalid Date" ||
        isNaN(new Date(established))
      ) {
        return res.status(409).json({
          status: '409 Invalid Date Format',
          error: 'Invalid Date Format. Date established Should be in the format (YYYY-MM)',
        });
      }
  
      if (established.length < 11 && established.length > 6) established = new Date(established)
         
      req.body.established = moment(established).format('l')
      console.log(req.body)
      return next();
    } catch(e){
      console.log(e)
      return res.status(500).json({
        status: '500 Server Error',
        error: 'Server Error. Invalid date',
      });
    }
  }

  /**
   * Check whether email already exist in the main user model.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @param {Response} next - The next parameter.
   * @memberof SignUp
   * @returns {JSON} - A JSON response.
   */
   static async emailAlreadyExistInTempFoundersRecord(req, res, next) {
    const { email } = req.body;
    const user = await AuthServices.founderEmailCheck(email, res);
    if (user) {
      return res.status(409).json({
        status: '409 Conflict',
        error: 'This email has submitted an application',
      });
    }
    return next();
  }
}
export default AuthValidator;
