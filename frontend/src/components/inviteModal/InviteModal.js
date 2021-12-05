import React, { useState, useContext } from "react";
import inviteVec from "../../assets/images/inviteVec.svg";
import close from "../../assets/images/closeVec.svg";
import { MuonButton } from "../index";
import { MuonInput } from "../muonInput/MuonInput";
import "./inviteModal.css";
import { useMutation } from "react-query";
import referMemberMutation from "../../mutations/referMember";
// import createConversationMutation from "../../mutations/createConversation";
import { AlertContext } from "../../context/alert";

export const InviteModal = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [type, setType] = useState("founder");

  const { setOn, setAlertContent } = useContext(AlertContext);
  const validateData = (email) =>{
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  const { mutate } = useMutation(referMemberMutation, {
    onError: (error) => {    
      setAlertContent({
        title: "Error!",
        message: error?.response?.data?.message ?? "Unable to refer member.",
        success: false,
      });
      setOn(true);
      // alert("Unable to refer member.");
    },
    onSuccess: (data) => {
      if (data.error) {
        setAlertContent({
          title: "Error!",
          message: data.error,
          success: false,
        });
        setOn(true);
        // alert("Member Referred");
      } else {
       
        setAlertContent({
          title: "Success!",
          message: "Invitation Link Sent.",
          success: true,
        });       
        setOn(true);
      }
    },
  });

  return (
    <div
      className="modal fade"
      id="inviteModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: 600 }}
      >
        <div className="modal-content" style={{ borderRadius: 12 }}>
          <div className="modal-body pb-4" style={{ position: "relative" }}>
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

            <div className="center_vec">
              <img src={inviteVec} alt="vector" className="invite_vec" />
            </div>
            <p className="mb-0 text-center invite-text mt-3">
              Invite your friends to Muon Club
            </p>
            <section
              className="mx-auto w-75 py-4 d-flex flex-column align-items-center"
              style={{ display: "inline-block" }}
            >
              <div className="w-100">
                <MuonInput
                  placeholder="Enter full name"
                  label="Full name"
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                />
              </div>
              <div className="w-100">
                <MuonInput
                  type="email"
                  placeholder="Enter email"
                  label="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="w-100">
                <label htmlFor="type">Investor or Founder?</label>
                <select
                  name="type"
                  id="type"
                  className="muon-input muon-select"
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                >
                  <option value="" disabled selected hidden>
                    Select Type
                  </option>
                  <option value="Investor">Investor</option>
                  <option value="Founder">Founder</option>
                </select>
              </div>
            </section>
            <div className="text-center"  aria-hidden="true"
                data-dismiss="modal"
                aria-label="Close">
              <MuonButton
                content="Send Invite"
                onClick={(e) => {                  
                  e.preventDefault();
                  if(!type || !fullName || !email){ 
                    setAlertContent({
                      title: "Error!",
                      message: 'Please fill all fields',
                      success: false,
                    });
                    setOn(true);
                  }else if(!validateData(email)){
                    setAlertContent({
                      title: "Error!",
                      message: 'Email is invalid',
                      success: false,
                    });
                    setOn(true);
                  }else{
                    mutate({ email: email, fullName: fullName, type: type });                             
                  }                 
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
