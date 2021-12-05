import React from "react";
import "./muonButton.css";

/**
 *
 * @param {String} content
 * @param {String} className
 * @param {Object} style
 * @param {Boolean} disabled
 * @param {Function} onClick
 * @param {String} type
 * @returns {JSX}
 */
const MuonButton = ({
  content = "button",
  className = "",
  style,
  disabled,
  onClick = () => {},
  type = "",
  id = "",
}) => {
  return (
    <button
      className={`muon-btn ${className} ${
        type === "danger" && "muon-btn-danger"
      }`}
      style={style}
      disabled={disabled}
      onClick={onClick}
      id={id}
    >
      {content}
    </button>
  );
};

export { MuonButton };
