import React from "react";
import { MuonInput } from "../../../components/index";

const StartUpEst = ({ getData, data }) => {
  return (
    <section>
      <MuonInput
        label="When was your startup established? *"
        placeholder="Your answer"
        id="startup_est_date"
        name="startup_est_date"
        labelClass="step-label"
        onChange={getData}
        defaultValue={data?.startup_est_date ?? ""}
        type="date"
      />

    </section>
  );
};

export default StartUpEst;
