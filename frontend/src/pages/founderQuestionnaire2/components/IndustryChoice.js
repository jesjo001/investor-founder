import React, { useState, useEffect, useMemo } from "react";
import { MuonDropdown } from "../../../components/index";

const IndustryChoice = ({
  getData,
  getDropdownData,
  data,
  disabled = false,
}) => {
  const industries = useMemo(
    () => [
      "Enterprise Software",
      "Fintech",
      "Health",
      "Transportation",
      "Marketing",
      "Energy",
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
    subscribe && getDropdownData("industryType", content);

    return () => {
      // unSubscribing default behaviour on mount
      subscribe = false;
    };
  }, [industries, data?.industryType]);

  return (
    <div>
      <section>
        <header className="muon-step-header mb-1">Industry</header>
        <div className="mb-4">
          <MuonDropdown
            subtitle="Comes under"
            options={industries}
            setContent={setContent}
            content={content}
            id="industryType"
            onSelect={getDropdownData}
            disabled={disabled}
          />
        </div>
      </section>

      <section>
        <p className="muon-about-header">
          Use 2-3 sentences to summarise the problem you are solving.
        </p>
        <p className="muon-about-desc">
          Describe the customer's problem you’re trying to solve with your
          product or service.
        </p>
        <textarea
          name="problemStatement"
          className="w-100 muon-textarea"
          placeholder="Type here"
          rows="5"
          onChange={getData}
          defaultValue={data?.problemStatement ?? ""}
        ></textarea>
      </section>
    </div>
  );
};

export default IndustryChoice;
