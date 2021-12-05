import React, { useState, useEffect, useMemo } from "react";
import { MuonDropdown } from "../../../components/index";

const IndustryChoice = ({ getData, data, disabled = false }) => {
  const industries = useMemo(
    () => [
      "Enterprise Software",
      "Fintech",
      "Health",
      "Transportation",
      "Marketing",
    ],
    []
  );

  const [content, setContent] = useState(industries[0]);
  useEffect(() => {
    // adding subscriptions
    let subscribe = true;

    //setting a default value to the state on mount
    // subscribe && setContent();

    // activating the current value in the state as the selected value
    subscribe && getData("industryType", content);

    return () => {
      // unSubscribing default behaviour on mount
      subscribe = false;
    };
  }, [industries, data?.industryType]);

  return (
    <section>
      <header className="muon-step-header">What’s your industry? *</header>
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
