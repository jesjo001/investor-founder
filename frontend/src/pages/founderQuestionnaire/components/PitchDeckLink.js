import React, { useState } from "react";
import { MuonInput } from "../../../components/index";

const PitchDeckLink = ({ getData, data }) => {
  // declaring error message to null
  const [errorMessage, setErrorMessage] = useState(null);

  const handlePitchDeck = (e) => {
    // url pattern to look up to while on change on the input field
    const urlPattern =
      /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi;
    const regex = new RegExp(urlPattern);

    if (e.target.value.match(regex)) {
      getData(e.target.name,e.target.value);
      return setErrorMessage(null);
    } else {
      return setErrorMessage("Input field only accepts url.");
    }
  };

  return (
    <section>
      <MuonInput
        label="Share the link to your pitch deck"
        placeholder="Your answer"
        id="pitch_deck_link"
        name="pitch_deck_link"
        type="url"
        required={true}
        labelClass="step-label"
        onChange={handlePitchDeck}
        errorMessage={errorMessage}
        defaultValue={data?.pitch_deck_link ?? ""}
      />
    </section>
  );
};

export default PitchDeckLink;
