import React, { useState, useEffect, useMemo } from "react";
import { MuonDropdown, MuonInput } from "../../../components/index";

const StartupWorth = ({ getDropdownData, getData, data, disabled = false }) => {
  const startupWorths = useMemo(
    () => [
      "0K - 100K",
      "100K - 500K",
      "500K - 1MIL",
      "1MIL - 5MIL",
      "5MIL - 10MIL",
    ],
    []
  );

  const [content, setContent] = useState(
    data?.ticketRaised /*money_raised*/ ?? startupWorths[0]
  );
  useEffect(() => {
    let subscribe = true;
    subscribe && setContent(data?.amountRaised /*money_raised*/ ?? content);
    subscribe && getDropdownData("amountRaised", content);

    return () => {
      subscribe = false;
    };
  }, [startupWorths]);
  return (
    <div>
      <section>
        <header className="muon-step-header mb-2">
          How much money have you raised so far?
        </header>
        <div className="mb-3">
          <MuonDropdown
            subtitle="Amount"
            options={startupWorths}
            setContent={setContent}
            content={content}
            id="amountRaised"
            onSelect={getDropdownData}
            disabled={disabled}
          />
        </div>
      </section>

      <MuonInput
        placeholder="Type here"
        label="How will these funds be allocated?"
        name="fundAllocation"
        onChange={getData}
        defaultValue={data?.fundAllocation ?? ""}
      />

      <MuonInput
        placeholder="Type here"
        label="What are your next milestones?"
        name="milestones"
        onChange={getData}
        defaultValue={data?.milestones ?? ""}
      />
    </div>
  );
};

export default StartupWorth;
