import React from "react";
import { MuonInput } from "../../../components/index";

const AboutStartup = ({getData, data}) => {
  return (
    <section>
      <MuonInput
        label="What’s cool about your startup?"
        placeholder="Your answer"
        id="about_startup"
        name="about_startup"
        labelClass="step-label"
        onChange={getData}
        defaultValue={data?.about_startup ?? ""}
      />
    </section>
  );
};

export default AboutStartup;
