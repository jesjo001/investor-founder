import React, { useState, useEffect, useMemo } from "react";
import { MuonDropdown } from "../../../components/index";

const IndustryChoice = ({ getData, data, disabled = false }) => {
  const industries = useMemo(()=>[
    "Enterprise Software",
    "Fintech",
    "Health",
    "Transportation",
    "Marketing",
  ],[]);

  const [content, setContent] = useState(
    data?.industryType ?? industries[0]
  );

  useEffect(() => {
    setContent(data?.industryType ?? industries[0]);
  }, [data, industries]);
  return (
    <section>
      <header className="muon-step-header">
        What industries do you invest in
      </header>
      <div className="muon-drop-wrap">
        <MuonDropdown
          subtitle="Industry"
          options={industries}
          setContent={setContent}
          content={content}
          // id="industry_choice"
          id="industryType"
          onSelect={getData}
          disabled={disabled}
        />
      </div>
    </section>
  );
};

export default IndustryChoice;
