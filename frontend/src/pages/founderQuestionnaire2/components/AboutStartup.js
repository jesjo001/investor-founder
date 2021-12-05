import React from "react";
import { MuonInput } from "../../../components/index";

const AboutStartup = ({ getData, data }) => {
  return (
    <section>
      <p className="muon-about-header">One-liner</p>
      <p className="muon-about-desc">
        Please use a succinct statement that describes what you company is
        about. You can use this formula: (Company name) is developing (a defined
        offering) to help (a defined audience) (solve a problem) with (secret
        sauce)".
      </p>
      <textarea
        name="aboutUs"
        className="w-100 muon-textarea"
        rows="5"
        onChange={getData}
        defaultValue={data?.aboutUs ?? ""}
      ></textarea>
    </section>
  );
};

export default AboutStartup;
