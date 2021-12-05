import React from "react";

const InvestorType = ({ getData, data }) => {
  return (
    <section>
      <header className="muon-step-header">Are you?</header>
      <div className="muon-checkbox-group d-flex justify-content-between">
        <label className="d-flex align-items-center muon-label mb-0">
          <input
            type="radio"
            name="investor_type"
            value="angel investor"
            className="muon-checkbox"
            onClick={getData}
            defaultChecked={data?.investor_type === "angle investor"}
          />
          An angel investor
        </label>
        <label className="d-flex align-items-center muon-label mb-0">
          <input
            type="radio"
            name="investor_type"
            value="vc"
            className="muon-checkbox"
            onClick={getData}
            defaultChecked={data?.investor_type === "vc"}
          />
          A venture capital
        </label>
        <label className="d-flex align-items-center muon-label mb-0">
          <input
            type="radio"
            name="investor_type"
            className="muon-checkbox"
            value="family office"
            onClick={getData}
            defaultChecked={data?.investor_type === "family office"}
          />
          A family office
        </label>
      </div>
    </section>
  );
};

export default InvestorType;
