import { chargeSwitch } from './utils/chargeSwitch';
import { payment } from './utils/payment';

// add company's shipping details and description
export const charge = async (req, res) => {
  console.log(req.body);
  let { amount, id, postalCode } = req.body;
  try {
    // create stripe payment
    payment({ id, postalCode });

    // set payment plan and plan data to the founder database
    chargeSwitch({ amount, id: req.user.id });

    // send success respond to the client
    return res.status(200).json({
      message: 'Payment Successful',
      success: true,
    });
  } catch (error) {
    // send error response to the server
    return res.status(400).json({
      message: 'Payment Failed',
      success: false,
    });
  }
};
