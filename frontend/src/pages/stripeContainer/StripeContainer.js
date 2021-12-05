import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import PaymentForm from "../../components/stripe/PaymentForm";

const PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_TEST;

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export const StripeContainer = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
};
