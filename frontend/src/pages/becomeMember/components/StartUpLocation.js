import React, { useState, useEffect, useMemo } from "react";
import { MuonDropdown } from "../../../components/index";

const StartUpLocation = ({ getData, data, disabled = false }) => {
  const locations = useMemo(()=>[
    "Western Europe",
    "Central and Eastern Europe",
    "Asia",
    "Africa",
    "Mediterranean & Middle East",
  ],[]);

  const [content, setContent] = useState(
    data?.industryLocation/*startup_location*/ ?? locations[0]
  );

  useEffect(() => {
    setContent(data?.industryLocation ?? locations[0])
}, [data, locations])
  return (
    <section>
      <header className="muon-step-header">
        What locations do you invest in
      </header>
      <div className="muon-drop-wrap">
        <MuonDropdown
          subtitle="Location"
          options={locations}
          setContent={setContent}
          content={content}
          // id="startup_location"
          id="industryLocation"
          onSelect={getData}
          disabled={disabled}
        />
      </div>
    </section>
  );
};

export default StartUpLocation;
