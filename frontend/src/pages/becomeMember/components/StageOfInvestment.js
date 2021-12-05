import React, { useState, useEffect, useMemo } from "react";
import { MuonDropdown } from "../../../components/index";

const StageOfInvestment = ({ getData, data, disabled = false }) => {
  const stages = useMemo(()=>[
    "Pre-startup/R&D",
    "MVP/Finished Product",
    "Series A",
    "Series B",
    "Series C",
  ], []);

  const [content, setContent] = useState(
    data?.stage /*stage_of_investment*/ ?? stages[0]
  );

  useEffect(() => {
    setContent(data?.stage /*stage_of_investment*/ ?? stages[0]);
  }, [data, stages]);

  return (
    <section>
      <header className="muon-step-header">
        Pick a stage you normally invest at
      </header>
      <div className="muon-drop-wrap">
        <MuonDropdown
          subtitle="Stage"
          options={stages}
          setContent={setContent}
          content={content}
          // id="stage_of_investment"
          id="stage"
          onSelect={getData}
          disabled={disabled}
        />
      </div>
    </section>
  );
};

export default StageOfInvestment;
