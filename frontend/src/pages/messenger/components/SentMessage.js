import React from "react";

export const SentMessage = ({
  message = "Ut minima pariatur. Sint exercitationem quis et.",
  time = "3:15 PM",
}) => {
  return (
    <div className="d-flex align-items-end flex-column muon-chat-bubble">
      <section className="muon-sent-message" style={{ maxWidth: 550 }}>
        {message}
      </section>
      <section className="d-flex justify-content-end align-items-center">
        {/* <img src={clock} alt="clock" /> */}
        {/* <p className="mb-0 muon-message-time">{time}</p> */}
      </section>
    </div>
  );
};
