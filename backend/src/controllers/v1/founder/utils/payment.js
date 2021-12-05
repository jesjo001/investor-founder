import stripe from 'stripe';
const Stripe = stripe(process.env.STRIPE_KEY);

export const payment = async ({
  amount,
  currency = 'USD',
  description = 'Your Company Description',
  name = 'Emmily',
  city = 'San Francisco',
  state = 'CA',
  country = 'US',
  id,
  confirm = true,
  line1 = 'Street 3, 345',
  postalCode,
}) =>
  await Stripe.paymentIntents.create({
    amount: amount * 100,
    currency,
    description,
    shipping: {
      name,
      address: {
        line1,
        postal_code: postalCode,
        city,
        state,
        country,
      },
    },
    payment_method: id,
    confirm: confirm,
  });
