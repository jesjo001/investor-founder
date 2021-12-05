import React from "react";
import { MuonInput } from "../../../components/index";

const Expertise = ({ getData, data }) => {
  return (
    <section>
      <MuonInput
        label="What's your expertise?"
        placeholder="Your answer"
        id="expertise"
        name="expertise"
        labelClass="step-label"
        onChange={getData}
        defaultValue={data?.expertise??""}
      />
    </section>
  );
};

export default Expertise;
