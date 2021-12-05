import React from "react";
import successVec from "../../assets/images/mailSentVec.svg";
import close from "../../assets/images/closeVec.svg";

export const EmailSentModal = () => {
  return (
    <div
      className="modal fade"
      id="emailModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: 600 }}
      >
        <div className="modal-content" style={{ borderRadius: 12 }}>
          <div className="modal-body pb-5" style={{ position: "relative" }}>
            <div className="d-flex justify-content-end">
              <span
                aria-hidden="true"
                data-dismiss="modal"
                aria-label="Close"
                role="button"
              >
                <img src={close} alt="close" />
              </span>
            </div>
            <div className="text-center">
              <img src={successVec} alt="vector" />
            </div>
            <p className="mb-0 mt-4 text-center success-text">
              Congratulations on creating your account
            </p>
            <p className="text-center" style={{fontSize: 14}}>
              A confirmation email has been sent to your registered email
              address.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
