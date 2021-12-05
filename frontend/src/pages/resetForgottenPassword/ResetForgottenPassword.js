import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { MuonButton, MuonInput } from "../../components";
import { resetPassword } from "../../mutations/auth";
import "./resetForgottenPassword.css";
import { useMutation } from "react-query";
import { forgotPassword } from "../../mutations/auth";
import { AlertContext } from "../../context/alert";
import { useHistory } from "react-router";

export const ResetForgottenPassword = () => {
  const [passwords, setPasswords] = useState({ new: "", confirm: "" });
  const [disabled, setDisabled] = useState(true);
  const { email, resetToken } = useParams();
  const [payload, setPayload] = useState({
    email,
    resetToken,
    password: passwords.new,
  });

  const history = useHistory();

  const { setOn, setAlertContent } = useContext(AlertContext);

  const { mutate } = useMutation(resetPassword, {
    onSuccess: (data) => {
      if (data.status) {
        setAlertContent({
          title: "Success!",
          message: data?.message,
          success: true,
        });
        setOn(true);
        setTimeout(() => history.replace("/signin"), 1000);
      } else {
        setAlertContent({
          title: "Error!",
          message: "Something went wrong",
          success: false,
        });
        setOn(true);
      }
    },
  });

  const handleChange = (e) => {
    setPasswords((passwords) => ({
      ...passwords,
      [e.target.id]: e.target.value,
    }));
    setPayload({ ...payload, password: passwords.new });

    // if (passwords.new) {
    //   setDisabled(false);
    // }
  };

  const handleReset = () => {
    mutate(payload);
  };
  return (
    <div>
      <h4 className="muon-reset-page-title">Muon Club</h4>

      <section
        className="d-flex flex-column align-items-center justify-content-center w-100"
        style={{ height: "70vh", minHeight: 300 }}
      >
        <div className="muon-reset-input">
          <MuonInput
            label="New password"
            type="password"
            id="new"
            onChange={handleChange}
          />
        </div>
        <div className="muon-reset-input">
          <MuonInput
            label="Confirm password"
            type="password"
            id="confirm"
            onChange={handleChange}
          />
        </div>
        <div className="text-center mt-4">
          <MuonButton
            content="Reset"
            className="px-5"
            disabled={
              !(passwords.new.length > 0 && passwords.new === passwords.confirm)
            }
            onClick={handleReset}
          />
        </div>
      </section>
    </div>
  );
};
