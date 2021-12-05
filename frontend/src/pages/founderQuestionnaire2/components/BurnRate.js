import React from "react";

const BurnRate = ({ data, getData }) => {
  return (
    <div>
      <section>
        <p className="muon-about-header mb-2">What is your burn rate?</p>
        <p className="muon-about-desc">
          Burn rate is the rate at which your start-up is spending money. E.g.,
          "our burn rate is currently $10,000 per month."
        </p>
        <textarea
          name="burnRate"
          className="w-100 muon-textarea"
          placeholder="Type here"
          rows="5"
          onChange={getData}
          defaultValue={data?.burnRate ?? ""}
        ></textarea>
      </section>
    </div>
  );
};

export default BurnRate;
