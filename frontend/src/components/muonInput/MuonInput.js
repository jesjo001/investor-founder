import React, { useState, useRef, useEffect } from "react";
import "./muonInput.css";
import pitch from "../../assets/images/pitchIcon.svg";
import openEye from "../../assets/images/openEye.svg";
import closeEye from "../../assets/images/closeEye.svg";

const MuonInput = ({
  label = "",
  placeholder = "",
  inputClass = "",
  labelClass = "",
  onChange = () => {},
  type = "text",
  id = "",
  name = "",
  defaultValue = "",
  disabled = false,
  error = false,
  style = {},
  list,
  errorMessage,
  required,
  className = "",
}) => {
  const [visible, setVisible] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  useEffect(() => {
    if (visible) {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  }, [visible]);
  if (type !== "file") {
    return (
      <>
        {type === "password" ? (
          <div className={`${className} muon-input-wrap `}>
            <label className={`muon-label ${labelClass} `}>{label}</label>
            <section
              className={`muon-input d-flex align-items-center w-100 p-0  ${inputClass} ${
                error && "muon-input-error"
              }`}
            >
              <input
                type={passwordType}
                placeholder={placeholder}
                className="border-0 h-100 muon-password"
                id={id}
                onChange={onChange}
                name={name}
                defaultValue={defaultValue}
                disabled={disabled}
                list={list ? list : null}
                required={required ? required : null}
                style={{
                  ...style,
                  borderColor: error && "red",
                  flexBasis: "85%",
                }}
              />

              <span
                style={{ flexBasis: "15%" }}
                className="d-flex justify-content-center px-3"
              >
                <img
                  src={visible ? openEye : closeEye}
                  alt="visibility"
                  role="button"
                  onClick={() => setVisible(!visible)}
                />
              </span>
            </section>
            {errorMessage && (
              <small className={`${error ? "text-danger" : ""}`}>
                {errorMessage}
              </small>
            )}
          </div>
        ) : (
          <div className={`${className} muon-input-wrap `}>
            <label className={`muon-label ${labelClass} `}>{label}</label>
            <input
              type={type}
              placeholder={placeholder}
              className={`muon-input ${inputClass} ${
                error && "muon-input-error"
              }`}
              id={id}
              onChange={onChange}
              name={name}
              defaultValue={defaultValue}
              disabled={disabled}
              list={list ? list : null}
              required={required ? required : null}
              style={{ ...style, borderColor: error && "red" }}
            />
            {errorMessage && (
              <small className={`${error ? "text-danger" : ""}`}>
                {errorMessage}
              </small>
            )}
          </div>
        )}
      </>
    );
  } else {
    return (
      <div className={`mb-3 `}>
        <label className={`muon-label ${labelClass} `}>{label}</label>
        <section
          className={`muon-input muon-pitch-file position-relative ${inputClass} ${
            error && "muon-input-error"
          }`}
        >
          <p className="mb-0">{defaultValue?.name ?? "Attach file"}</p>
          <input
            type={type}
            placeholder={placeholder}
            id={id}
            onChange={onChange}
            name={name}
            list={list ? list : null}
            required={required ? required : null}
            // defaultValue={defaultValue}
            disabled={disabled}
            style={{ ...style, borderColor: error && "red" }}
          />
          <img src={pitch} alt="pitch" />
        </section>
        {errorMessage && (
          <small className={`${error ? "text-danger" : ""}`}>
            {errorMessage}
          </small>
        )}
      </div>
    );
  }
};

export { MuonInput };
