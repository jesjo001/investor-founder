import React, { useState, useEffect, useMemo } from "react";
import { MuonDropdown } from "../../../components/index";

const MoneyRequired = ({ getData, data, disabled = false }) => {
  const moneyRequired = useMemo(
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
    data?.ticketToRaise /*money_required*/ ?? moneyRequired[0]
  );
  useEffect(() => {
    let subscribe = true;
    subscribe &&
      setContent(data?.ticketToRaise /*money_required*/ ?? content);
    subscribe && getData("ticketToRaise", content);

    return () => {
      subscribe = false;
    };
  }, [data?.ticketToRaise, moneyRequired]);
  return (
    <section>
      <header className="muon-step-header">
        How much money do you want to raise? *
      </header>
      <div className="muon-drop-wrap">
        <MuonDropdown
          subtitle="Money required"
          options={moneyRequired}
          setContent={setContent}
          content={content}
          id="ticketToRaise"
          // id="money_required"
          onSelect={getData}
          disabled={disabled}
        />
      </div>
    </section>
  );
};

export default MoneyRequired;
