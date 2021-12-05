import React, { useState } from "react";
import "./cookieCard.css";
import { MuonButton } from "../../components/index";
import close from "../../assets/images/closeVec.svg";

export const CookieCard = () => {
  let cookie = localStorage.getItem("cookie")
    ? JSON.parse(localStorage.getItem("cookie"))
    : false;
  const [open, setOpen] = useState(!cookie);

  const setCookieCard = () => {
    setOpen(false);
    localStorage.setItem("cookie", JSON.stringify(true));
  };
  return (
    <div
      className="align-items-center muon-cookie-card shadow-lg"
      style={{ display: !open ? "none" : "" }}
    >
      <img
        src={close}
        alt="close"
        role="button"
        className="muon-close-cookie"
        onClick={setCookieCard}
      />
      <section className="px-2 cookie-first-section">
        <h4>We care about your privacy</h4>
        <p>
          We use cookies to personalize content and ads, to provide social media
          features and to analyse our traffic. We also share information about
          your use of our site with our social media, advertising and analytics
          partners who may combine it with other information that you’ve
          provided to them or that they’ve collected from your use of their
          services.
        </p>
      </section>
      <section className="px-2 d-flex justify-content-center cookie-second-section">
        <MuonButton content="Accept" className="px-5" onClick={setCookieCard} />
      </section>
    </div>
  );
};
