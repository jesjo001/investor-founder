import React from "react";

const StartupCompetition = ({ data, getData }) => {
  return (
    <div>
      <section>
        <p className="muon-about-header mb-2">Who are your competitors? </p>

        <textarea
          name="myCompetitors"
          className="w-100 muon-textarea"
          placeholder="Type here"
          rows="5"
          onChange={getData}
          defaultValue={data?.myCompetitors ?? ""}
        ></textarea>
      </section>
      <section>
        <p className="muon-about-header">
          What are your strengths and advantages over your competitors?{" "}
        </p>

        <textarea
          name="ourAdvantage"
          className="w-100 muon-textarea"
          placeholder="Type here"
          rows="5"
          onChange={getData}
          defaultValue={data?.ourAdvantage ?? ""}
        ></textarea>
      </section>
    </div>
  );
};

export default StartupCompetition;
