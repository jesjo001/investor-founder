import React from "react";

const WhyNow = ({ data, getData }) => {
  return (
    <div>
      <section>
        <p className="muon-about-header">
          Why is this the right time for this product or service?
        </p>

        <textarea
          name="whyOurCompany"
          className="w-100 muon-textarea"
          placeholder="Type here"
          rows="5"
          onChange={getData}
          defaultValue={data?.whyOurCompany ?? ""}
        ></textarea>
      </section>
    </div>
  );
};

export default WhyNow;
