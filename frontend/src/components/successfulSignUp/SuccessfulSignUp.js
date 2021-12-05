import React from "react";
import successVec from "../../assets/images/signUpSuccessVec.svg";
import close from "../../assets/images/closeVec.svg";
import "./successfulSignUp.css";
// import { MuonButton } from "../index";
// import { useHistory } from "react-router-dom";
// import { closeModal } from "../../utils/rest";

export const SuccessfulSignUp = () => {
  // let history = useHistory();

  // const handleReroute = () => {
  //   closeModal("signUpModal");
  //   setTimeout(() => {
  //     history.push("/signin");
  //   }, 200);
  // };
  return (
    <div
      className="modal fade"
      id="signUpModal"
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
            <p className=" text-center success-text">
              You have successfully created an account.
            </p>
            <p className=" text-center success-text">
              We will redirect you to your dashboard.
            </p>
            <div className="text-center"></div>
            <div className="text-center">
              {/* <MuonButton content="Log in now" onClick={handleReroute} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
