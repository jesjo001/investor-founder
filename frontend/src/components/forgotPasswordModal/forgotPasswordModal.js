import React, { useState, useContext } from "react";
import { MuonButton, MuonInput } from "..";
import close from "../../assets/images/closeVec.svg";
import { useHistory } from "react-router";
import { useMutation } from "react-query";
import { forgotPassword } from "../../mutations/auth";
import { AlertContext } from "../../context/alert";

export const ForgotPasswordModal = () => {
  const [email, setEmail] = useState({ email: "" });
  const { setOn, setAlertContent } = useContext(AlertContext);

  const { mutate } = useMutation(forgotPassword, {
    onSuccess: (data) => {
      window.$("#forgotModal").modal("hide");
      if (data.status) {
        setAlertContent({
          title: "Success!",
          message: data?.message,
          success: true,
        });
        setOn(true);
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

  const handleSubmit = () => {
    mutate(email);
  };

  return (
    <div className="modal fade" id="forgotModal">
      <section
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: 600 }}
      >
        <div className="modal-content" style={{ borderRadius: 12 }}>
          <div className="d-flex justify-content-end p-3">
            <span
              aria-hidden="true"
              data-dismiss="modal"
              aria-label="Close"
              role="button"
            >
              <img src={close} alt="close" />
            </span>
          </div>

          <section>
            <p className="mb-0 text-center invite-text mt-3">
              Enter email for password reset
            </p>
            <section
              className="mx-auto w-75 py-4 d-flex flex-column align-items-center"
              style={{ display: "inline-block" }}
            >
              <div className="w-100">
                <MuonInput
                  placeholder="Enter your email"
                  label="Email Address"
                  type="email"
                  onChange={(e) => {
                    setEmail({ email: e.target.value });
                  }}
                />
              </div>
              <div className="text-center">
                <MuonButton content="Submit" onClick={handleSubmit} />
              </div>
            </section>
          </section>
        </div>
      </section>
    </div>
  );
};
