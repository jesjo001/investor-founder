import React, { useState } from "react";
import { MuonInput } from "../../../components/index";
import useFoundersListQuery from "../../../queries/founderList";

const FindCoFounder = ({ getData, data, disabled = false }) => {
  const { data: connection, isError } = useFoundersListQuery("getFounders");
  const [founderName, setFounderName] = useState("");
 
  if (isError) return console.error("Something went wrong, try again later.");

  const coFounderNames = connection && connection.map(({ name }) => name);

  const handleCoFounderNamesClick = (value) => {
    
    setFounderName(value);
    getData("cofounder", value);
  };
  return (
    <section>
      <header className="muon-step-header">
        Find your co-founder in our system: *
      </header>
      <div>
        <form className="muon-drop-wrap">
          <MuonInput
            label="CoFounder Names"
            list="founderNames"
            id="cofounder"
            placeholder="Search for cofounders"
            value={founderName}
            onChange={(e) => handleCoFounderNamesClick(e.target.value)}
            disabled={disabled}
          />

          <datalist id="founderNames">
            {coFounderNames &&
              coFounderNames.map((value, idx) => (
                <option key={idx} value={value} />
              ))}
          </datalist>
        </form>
      </div>
    </section>
  );
};

export default FindCoFounder;
