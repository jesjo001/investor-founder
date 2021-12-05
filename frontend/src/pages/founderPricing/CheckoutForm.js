import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { API_PATH } from "../../utils/constants";

export const CheckoutForm = ({ plan }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      const result = await axios({
        url: `${API_PATH}/founder/charge`,
        method: "POST",
        data: {
          id: paymentMethod.id,
          amount: plan,
          postalCode: paymentMethod.billing_details.address.postal_code,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return result.data;
    } else {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <div className="text-center mt-5">
        <button className="muon-send-btn">
          <span className="px-5">
            <p className="px-5">Pay</p>
          </span>
        </button>
      </div>
    </form>
  );
};
