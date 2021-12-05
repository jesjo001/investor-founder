import React from "react";

const StartupSolution = ({ data, getData }) => {
  return (
    <div>
      <section>
        <p className="muon-about-header">Describe your solution. </p>
        <p className="muon-about-desc">
          Imagine that readers don't know anything about this subject. What
          exactly do you do to solve the customer's problem?
        </p>
        <textarea
          name="companySolution"
          className="w-100 muon-textarea"
          placeholder="Type here"
          rows="5"
          onChange={getData}
          defaultValue={data?.companySolution ?? ""}
        ></textarea>
      </section>
    </div>
  );
};

export default StartupSolution;
