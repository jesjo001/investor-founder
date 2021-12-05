import React from "react";
import person from "../../../assets/images/avatarHolder.webp";
import { API_PATH } from "../../../utils/constants";

export const ReceivedMessage = ({
  message = "Ut minima pariatur. Sint exercitationem quis et. Ut minima pariatur. Sint exercitationem quis et. ",
  time = "3:18 PM",
  profile,
  by,
}) => {
  const addPlaceholder = (e) => {
    e.target.src = person;
  };
  return (
    <div className="d-flex align-items-start muon-chat-bubble">
      <img
        src={`${API_PATH}/${profile}`}
        onError={addPlaceholder}
        alt="sender dp"
        className="muon-sender-dp"
      />
      <div className="d-flex flex-column align-items-start">
        <section className="muon-receive-message" style={{ maxWidth: 550 }}>
          {message}
        </section>
        <section className="d-flex justify-content-start align-items-center">
          {/* <img src={clock} alt="clock" /> */}
          {/* <p className="mb-0 muon-message-time">{time}</p> */}
          <p className="mb-0 muon-message-time">{by}</p>
        </section>
      </div>
    </div>
  );
};
