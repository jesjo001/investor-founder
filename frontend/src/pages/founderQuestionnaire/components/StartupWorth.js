import React, { useState, useEffect, useMemo } from "react";
import { MuonDropdown } from "../../../components/index";

const StartupWorth = ({ getData, data, disabled = false }) => {
  const startupWorths = useMemo(
    () => [
      "0K - 100K",
      "100K - 500K",
      "500k - 1MIL",
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
    subscribe &&
      setContent(data?.ticketRaised /*money_raised*/ ?? content);
    subscribe && getData("ticketRaised", content);

    return () => {
      subscribe = false;
    };
  }, [startupWorths]);
  return (
    <section>
      <header className="muon-step-header">
        How much money have you raised so far? *
      </header>
      <div className="muon-drop-wrap">
        <MuonDropdown
          subtitle="Money raised"
          options={startupWorths}
          setContent={setContent}
          content={content}
          // id="money_raised"
          id="ticketRaised"
          onSelect={getData}
          disabled={disabled}
        />
      </div>
    </section>
  );
};

export default StartupWorth;
