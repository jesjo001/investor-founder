import PaymentPlan from "../../../models/paymentPlans";
import Subscription from "../../../models/subscription";
import moment from 'moment';
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);


/**
 *Contains Payment Controller
 *
 *
 *
 * @class PaymentController
 */
class PaymentController {

  /**
   * Get Payment plans.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof PaymentController
   * @returns {JSON} - A JSON success response.
   */
  static async getPaymentPlans(req, res) {

    try {
      const plans = await PaymentPlan.find({});
      return res.status(200).json({
        status: "success",
        data: {
          plans
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: "500 Internal server error",
        error:
          "Error getting payment plans",
      });
    }
  }



  /**
   * Process payment
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof PaymentController
   * @returns {JSON} - A JSON success response.
   */
  static async processPayment(req, res) {
    let { amount, id, userId, planId } = req.body;
    try {
      // verifiy payment
      const payment = await stripe.paymentIntents.create({
        amount,
        currency: 'USD',
        description: 'Muon payment',
        payment_method: id,
        confirm: true,
      });

      // get the payment plan details    
      const paymentPlan = await PaymentPlan.findById(planId, {
        amount: 1,
        duration: 1,
      });

      if (!paymentPlan) {
        return res.status(404).json({
          status: "error",
          data: {
            message: 'Payment plan not found'
          },
        });
      }

      // check whether the user has a subscription record     
      let userSubscription = await Subscription.findOne({
        userId
      });

      // create a subscription for a new user
      if (!userSubscription) {
        const data = {
          userId,
          planId
        }
        userSubscription = await Subscription.create(data);
      }

      //credit the user
      const startdate = moment().toDate();
      const endDate = moment(startdate, "DD-MM-YYYY")
        .add(paymentPlan.duration, "months")
        .toDate();

      userSubscription.startDate = startdate;
      userSubscription.endDate = endDate;
      userSubscription.save();

      res.json({
        message: 'Payment successful',
        success: true,
      });
    } catch (error) {
      // console.log('Error', error);
      res.json({
        message: 'Payment failed',
        success: false,
      });
    }
  }
}
export default PaymentController;
