import React, { useState, useEffect, useMemo } from "react";
import { MuonDropdown } from "../../../components/index";

const StageOfInvestment = ({ getData, data, disabled = false }) => {
  const stages = useMemo(
    () => ['Idea', 'MVP/Seed', 'Product market fit', 'Scaling'],
    []
  );

  const [content, setContent] = useState(data?.stage ?? stages[0]);
  useEffect(() => {
    setContent(data?.stage ?? content);
    getData("stage", content);
  }, [stages]);
  return (
    <section>
      <header className="muon-step-header">What stage are you at? *</header>
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
