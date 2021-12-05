import React, { useState, useContext, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { AlertContext } from "../../context/alert";
import { API_PATH } from "../../utils/constants";
import { checkPlanStatus } from "../../utils/auth";
import "./stripe.css";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4foff",
      color: "#212529",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": {
        color: "#ddd",
      },
    },
    invalid: {
      color: "#f6a4a4",
      iconColor: "#f6a4a4",
    },
  },
};

const PaymentForm = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState();
  let { setOn, setAlertContent } = useContext(AlertContext);

  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  const { planId, planAmount } = history.location.state;

  // useEffect(() => {
  //   planStatus();
  // }, []);

  // const planStatus = async () => {
  //   const resp = await checkPlanStatus();
  //   setStatus(resp);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios({
          method: "POST",
          url: `${API_PATH}/payment/process-payment`,
          data: {
            amount: planAmount * 100,
            id,
            userId: localStorage.id,
            planId: planId,
          },
        });

        if (response.data.success) {
          // const subStat =
          // localStorage.subscriptionStatus = true;
          console.log("Successful Payment");
          setSuccess(true);
          setLoading(false);
          history.replace({
            state: {},
          });
          elements.getElement(CardElement).clear();
          setAlertContent({
            title: "Success!",
            message: "Payment Successful",
            success: true,
          });
          setOn(true);
          history.push("/founder/dashboard");
        }
      } catch (error) {
        // setError(error.response.data.error);
        setAlertContent({
          title: "Error!",
          message: error?.response?.data?.error ?? "Something went wrong",
          success: false,
        });
        setOn(true);
        // console.log("Error:", error.response.data.error);
        setLoading(false);
      }
    } else {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="StripeContainer">
        <fieldset className="FormGroup">
          <div className="FormRow">
            <CardElement options={CARD_OPTIONS} />
          </div>
        </fieldset>
        <button className="StripeButton">
          {loading ? (
            <div class="spinner-border text-light" role="status"></div>
          ) : (
            "Pay"
          )}
        </button>
      </form>
      {/* ) : (
        <div className="StripeContainer">
          <h2 className="Stripe">Payment Successfull</h2>
        </div>
      )} */}
    </>
  );
};

export default PaymentForm;
