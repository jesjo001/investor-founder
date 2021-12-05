import React, { useState } from "react";
import "./muonDropdown.css";
import close from "../../assets/images/dropdownClose.svg";
import arrow from "../../assets/images/dropdownArrow.svg";

const MuonDropdown = ({
  id = "dropdown",
  subtitle = "subtitle",
  content = "content",
  setContent,
  options = ["option 1", "option 2", "option 3", "option 4"],
  disabled = false,
  onSelect = () => {},
}) => {
  const [open] = useState(false);

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary muon-dropdown"
        type="button"
        id={id}
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        disabled={disabled}
      >
        <div>
          <p className="muon-drop-subtitle">{subtitle}</p>
          <p className="muon-drop-content">{content}</p>
        </div>
        <section>
          {/* <img src={close} alt="close" /> */}
          <img
            src={arrow}
            alt="arrow"
            className={`${open ? "muon-drop-open" : "muon-drop-arrow"}`}
          />
        </section>
      </button>
      <div className="dropdown-menu w-100 muon-drop-menu" aria-labelledby={id}>
        {options.map((option, i) => {
          return (
            <button
              className="dropdown-item"
              type="button"
              key={`${option}${i}`}
              onClick={() => {
                setContent(option);
                onSelect(id, option);
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export { MuonDropdown };
