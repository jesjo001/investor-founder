import React, { useState, useEffect, useMemo } from "react";
import { MuonDropdown, MuonInput } from "../../../components";

const StartupStage = ({
  data,
  getData,
  getDropdownData = () => {},
  disabled = false,
}) => {
  const stages = useMemo(
    () => ['Idea', 'MVP/Seed', 'Product market fit', 'Scaling'],
    []
  );

  const [content, setContent] = useState(data?.stage ?? stages[0]);
  console.log(content)
  useEffect(() => {
    setContent(data?.companyStage ?? content);
    getDropdownData("companyStage", content);
  }, [stages]);
  return (
    <div>
      <MuonInput
        label="How many co-founders do you have?"
        placeholder="Enter the number"
        name="numOfCoFounders"
        onChange={getData}
        defaultValue={data?.numOfCoFounders}
      />
      <section>
        <header className="muon-step-header mb-1">Company Stage</header>
        <div className="muon-drop-wrap">
          <MuonDropdown
            subtitle="Stage"
            options={stages}
            setContent={setContent}
            content={content}
            id="companyStage"
            onSelect={getDropdownData}
            disabled={disabled}
          />
        </div>
      </section>
    </div>
  );
};

export default StartupStage;
