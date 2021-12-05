import React from "react";

export const TimeStrip = ({ message = "Yesterday, 29 Aug" }) => {
  return (
    <div className="messenger-time-stripe d-flex align-items-center justify-content-center">
      <span></span>
      <p className="mb-0">{message}</p>
      <span></span>
    </div>
  );
};
