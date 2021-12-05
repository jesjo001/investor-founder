import React from "react";

const CoFounders = ({ getData, data }) => {
  return (
    <section>
      <header className="muon-step-header">Do you have co-founders? *</header>
      <div
        className="muon-checkbox-group d-flex align-items-center"
        style={{ columnGap: 32 }}
      >
        <label className="d-flex align-items-center muon-label mb-0">
          <input
            type="radio"
            name="has_co_founders"
            value={true}
            className="muon-checkbox"
            onClick={getData}
            defaultChecked={data?.has_co_founders === "true"}
          />
          Yes
        </label>
        <label className="d-flex align-items-center muon-label mb-0">
          <input
            type="radio"
            name="has_co_founders"
            value={false}
            className="muon-checkbox"
            onClick={getData}
            defaultChecked={data?.has_co_founders === "false"}
          />
          No
        </label>
      </div>
    </section>
  );
};

export default CoFounders;
