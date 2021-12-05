import React, { useContext, useEffect } from "react";
import "./alertBox.css";
import close from "../../assets/images/closeVec.svg";
import { AlertContext } from "../../context/alert";

export const AlertBox = () => {
  const alertContext = useContext(AlertContext);

  const {
    content: { message, title, success },
    on,
    setOn,
  } = alertContext;

  useEffect(() => {
    if (on) {
      setTimeout(() => {
        setOn(false);
      }, 5000);
    }
  });

  return (
    <div className={`muon-alert-wrap ${on ? "alert-on" : "alert-off"}`}>
      <section
        className={`muon-alert ${success ? "success-alert" : "error-alert"}`}
      >
        <h4>{title}</h4>
        <p className="mb-0">{message}</p>
      </section>
      <img
        src={close}
        alt="close"
        role="button"
        className="alert-close"
        onClick={() => setOn(false)}
      />
    </div>
  );
};
