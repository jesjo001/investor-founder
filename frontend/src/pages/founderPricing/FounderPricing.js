import React, { useState, useEffect } from "react";
import axios from "axios";
import "./founderPricing.css";
import back from "../../assets/images/arrow-forward.svg";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "./CheckoutForm";
import { STRIPE_PUBLIC } from "../../utils/constants";
import { API_PATH } from "../../utils/constants";
import { useHistory } from "react-router-dom";
import { StripeContainer } from "../../pages/index";

const stripePromise = loadStripe(STRIPE_PUBLIC);

export const FounderPricing = () => {
  const [plans, setPlans] = useState(0);
  const history = useHistory();

  useEffect(() => {
    getPlans();
  }, []);

  const getPlans = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${API_PATH}/payment`,
      });
      const { plans } = response.data.data;
      setPlans(plans);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="muon-plan">
      <div className="muon-people-intro muon-price-header">
        <p className="muon-work-intro-txt">Pick your membership plan</p>
      </div>
      <section className="muon-plan-grid">
        {plans &&
          plans.map((plan, i) => (
            <div
              key={i}
              className={`muon-plan-card ${
                plan.duration === 3 ? `value-card` : `white-card`
              } d-flex flex-column justify-content-between align-items-center`}
            >
              {plan.duration === 3 && (
                <section className="value-added">
                  <div>Value Added</div>
                </section>
              )}
              <div className="text-center px-4">
                <p
                  className={
                    plan.duration === 3
                      ? `muon-value-duration`
                      : `muon-plan-duration`
                  }
                >
                  {plan.package}
                </p>
                <h3
                  className={
                    plan.duration === 3 ? `muon-value-rate` : `muon-plan-rate`
                  }
                >
                  {plan.unit}
                </h3>
                <p
                  className={
                    plan.duration === 3 ? `muon-value` : `muon-plan-value`
                  }
                >
                  {plan.description}
                </p>
              </div>
              <button
                className="muon-choose-btn"
                onClick={(e) => {
                  e.preventDefault();
                  history.push({
                    pathname: "/payment",
                    state: { planId: plan._id, planAmount: plan.amount },
                  });
                }}
              >
                <p>Choose</p>
              </button>
            </div>
          ))}
      </section>
    </section>
  );
};
