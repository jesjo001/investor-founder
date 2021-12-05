import React from "react";
import { MuonInput } from "../../../components/index";

const Personal = ({ getData, data }) => {
  return (
    <section>
      <MuonInput
        label="Personal : What makes you who you are?"
        placeholder="Your answer"
        id="personal"
        name="personal"
        labelClass="step-label"
        onChange={getData}
        defaultValue={data?.personal ?? ""}
      />
    </section>
  );
};

export default Personal;
