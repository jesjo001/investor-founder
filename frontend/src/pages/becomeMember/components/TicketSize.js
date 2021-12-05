import React, { useState, useEffect, useMemo } from "react";
import { MuonDropdown } from "../../../components/index";

const TicketSize = ({ getData, data, disabled = false }) => {
  const ticketSizes = useMemo(
    () => [
      "0K - 100K",
      "100K - 500K",
      "500k - 1MIL",
      "1MIL - 5MIL",
      "5MIL - 10MIL",
    ],
    []
  );

  const [content, setContent] = useState(data?.ticketSize ?? ticketSizes[0]);

  console.log("content", content);

  useEffect(() => {
    setContent(data?.ticketSize ?? ticketSizes[0]);
  }, [data, ticketSizes]);
  return (
    <section>
      <header className="muon-step-header">What is your ticket size?</header>
      <div className="muon-drop-wrap">
        <MuonDropdown
          subtitle="Ticket size"
          options={ticketSizes}
          setContent={setContent}
          content={content}
          id="ticketSize"
          onSelect={getData}
          disabled={disabled}
        />
      </div>
    </section>
  );
};

export default TicketSize;
