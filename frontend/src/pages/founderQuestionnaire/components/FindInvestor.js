import React, { useState } from "react";
import { MuonInput } from "../../../components/index";
import useInvestorsListQuery from "../../../queries/investorList";

const FindInvestor = ({ getData, data, disabled = false }) => {
  const { data: connection, isError } = useInvestorsListQuery("getFounders");

  const [investorName, setInvestorsName] = useState("");
  if (isError) return console.error("Something went wrong, try again later.");

  const _investorsNames = connection && connection.map(({ name }) => name);

  const handleInvestorsNamesChange = (value) => {
    setInvestorsName(value);
    getData("investor", value);
  };

  return (
    <section>
      <header className="muon-step-header">
        Find your investors in our system *
      </header>

      <form className="muon-drop-wrap">
        <MuonInput
          label="Investor name"
          id="invstor"
          list="investors"
          placeholder="Search for investors"
          value={investorName}
          onChange={(e) => handleInvestorsNamesChange(e.target.value)}
          disabled={disabled}
        />

        <datalist id="investors">
          {_investorsNames &&
            _investorsNames.map((value, idx) => (
              <option key={idx} value={value} />
            ))}
        </datalist>
      </form>
    </section>
  );
};

export default FindInvestor;
