import React, { useMemo,useEffect, useState } from "react";
import {MuonDropdown, MuonInput} from "../../../components/index";

const PitchDeckLink = ({ getData, getDropdownData = () => {}, data, disabled = false }) => {

  const stages = useMemo(
      () => ['Search Engine', 'LinkedIn', 'Facebook', 'Instagram', 'Muon Club Team'],
      []
  );

  useEffect(() => {
    setContent(data?.source ?? content);
    getDropdownData("source", content);
  }, [stages]);

  const [content, setContent] = useState(data?.stage ?? stages[0]);
  // declaring error message to null
  const [errorMessage, setErrorMessage] = useState(null);

  const handlePitchDeck = (e) => {
    // url pattern to look up to while on change on the input field
    const urlPattern =
      /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi;
    const regex = new RegExp(urlPattern);

    if (e.target.value.trim().length > 0) {
      if (e.target.value.match(regex)) {
        getData(e.target.name, e.target.value);
        setErrorMessage(null);
      } else {
        getData(e.target.name, e.target.value);
        setErrorMessage("Input field only accepts url.");
      }
    } else {
      getData(e.target.name, "");
      setErrorMessage("");
    }
  };

  return (
    <section>
      <MuonInput
        label="Share the link to your pitch-deck. (Optional)"
        placeholder="Type here"
        id="pitchDeckLink"
        name="pitchDeckLink"
        type="url"
        required={true}
        labelClass="step-label"
        onChange={handlePitchDeck}
        errorMessage={errorMessage}
        error={errorMessage?.length > 0}
        defaultValue={data?.pitchDeckLink ?? ""}
      />

      <section>
        <header className="muon-step-header mb-1">How did you hear about Muon Club?</header>
        <div className="muon-drop-wrap">
          <MuonDropdown
              subtitle="Source"
              options={stages}
              setContent={setContent}
              content={content}
              id="source"
              onSelect={getDropdownData}
              disabled={disabled}
          />
        </div>
      </section>
    </section>
  );
};

export default PitchDeckLink;
