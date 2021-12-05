import React from "react";
import { MuonInput } from "../../../components/index";

const StartUpInvestment = ({ getData, data }) => {
  return (
    <section>
      <MuonInput
        label="What startups did you invest in?"
        placeholder="Your answer"
        id="invested_startup"
        name="invested_startup"
        labelClass="step-label"
        onChange={getData}
        defaultValue={data?.invested_startup ?? ""}
      />
    </section>
  );
};

export default StartUpInvestment;
