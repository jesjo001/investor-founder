import React from "react";
import { useHistory } from "react-router";
import "./notFound.css";

export const NotFound = () => {
  const history = useHistory();

  return (
    <div className="d-flex align-items-center justify-content-center muon-not-found">
      <section className="muon-not-found-content">
        <h1 className="mb-0 text-center">404</h1>
        <i className="d-block text-center mb-3">Opp, Seem you lost your way</i>
        <p onClick={() => history.goBack()}>Go back</p>
      </section>
    </div>
  );
};
