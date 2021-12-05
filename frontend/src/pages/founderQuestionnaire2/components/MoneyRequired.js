import React, { useState, useEffect, useMemo } from "react";
import { MuonDropdown, MuonInput } from "../../../components/index";

const MoneyRequired = ({
  getData,
  getDropdownData,
  data,
  disabled = false,
}) => {
  const moneyRequired = useMemo(
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
    data?.ticketToRaise /*money_required*/ ?? moneyRequired[0]
  );
  useEffect(() => {
    let subscribe = true;
    subscribe && setContent(data?.amountToRaise /*money_required*/ ?? content);
    subscribe && getDropdownData("amountToRaise", content);

    return () => {
      subscribe = false;
    };
  }, [data?.ticketToRaise, moneyRequired]);
  return (
    <div>
      <MuonInput
        placeholder="Type here"
        label="Have you made a profit? If not, how long will it take to become profitable?"
        name="madeProfit"
        onChange={getData}
        defaultValue={data?.madeProfit ?? ""}
      />
      <section>
        <header className="muon-step-header mb-2">
          How much money do you want to raise?
        </header>
        <div className="muon-drop-wrap">
          <MuonDropdown
            subtitle="Amount"
            options={moneyRequired}
            setContent={setContent}
            content={content}
            id="amountToRaise"
            // id="money_required"
            onSelect={getDropdownData}
            disabled={disabled}
          />
        </div>
      </section>
    </div>
  );
};

export default MoneyRequired;
