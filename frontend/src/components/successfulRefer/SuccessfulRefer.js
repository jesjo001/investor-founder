import React from "react";
import successVec from "../../assets/images/succesReferVec.svg";
import close from "../../assets/images/closeVec.svg";

export const SuccessfulRefer = () => {
  return (
    <div
      className="modal fade"
      id="referModal"
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
              <img src={successVec} alt="vector" className="invite_vec" />
            </div>
            <p className="mb-0 mt-4 text-center success-text">
              You have successfully referred
            </p>
            <p className="text-center">a friend.</p>
            {/* <p className="text-center">johndoe@gmail.com</p> */}
            <div className="text-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
