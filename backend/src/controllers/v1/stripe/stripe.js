const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);

export const makePayment = async (req, res) => {
  let { amount, id, userId, planId } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'Muon payment',
      payment_method: id,
      confirm: true,
    });
    console.log('Payment', payment);
    console.log('User ID', userId);
    console.log('Plan ID', planId);
    res.json({
      message: 'Payment successful',
      success: true,
    });
  } catch (error) {
    console.log('Error', error);
    res.json({
      message: 'Payment failed',
      success: false,
    });
  }
};
