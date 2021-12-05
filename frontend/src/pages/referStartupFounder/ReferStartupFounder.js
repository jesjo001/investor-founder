import React, { useLayoutEffect, useState, useContext } from "react";
import { MuonButton, MuonInput, SuccessfulRefer } from "../../components/index";
import "./referStartupFounder.css";
import rocket from "../../assets/images/referRocket.svg";
import rocketSm from "../../assets/images/referRocketSm.svg";
import { useMutation } from "react-query";
import referMemberMutation from "../../mutations/referMember";
import { openModal } from "../../utils/rest";
import { AlertContext } from "../../context/alert";

const ReferStartupFounder = () => {
  const [referData, setReferData] = useState({});
  const { setOn, setAlertContent } = useContext(AlertContext);

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
      } else {
        // alert("Member Referred");
        openModal("referModal");
        // setAlertContent({
        //   title: "Success!",
        //   message: "Member Referred Successfully",
        //   success: true,
        // });
        // setOn(true);
        // alert("Member Referred");
      }
    },
  });

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getReferData = (e) => {
    setReferData({ ...referData, [e.target.id]: e.target.value });
    console.log(referData);
  };

  return (
    <div className="muon-become">
      <SuccessfulRefer />
      <section
        className="row mx-0 h-100"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <div className="col-md-6 muon-refer-founder-bg">
          <img src={rocket} alt="rocket" className="muon-refer-rocket" />
          <img src={rocketSm} alt="rocket" className="muon-refer-rocket-sm" />

          <div className="muon-become-txt">
            <h1 className="muon-become-header">
              Refer a start-up
              <br className="muon-refer-br" /> founder
            </h1>
          </div>
        </div>
        <div className="col-md-6 d-flex flex-column align-items-center px-0">
          <div className="muon-become-steps">
            <section>
              <h3 className="muon-refer-form-header">
                Tell us who you want to invite and let's get them onboard.
              </h3>

              <MuonInput
                label="Name"
                placeholder="Enter name"
                id="name"
                onChange={getReferData}
                defaultValue={referData?.name ?? ""}
              />

              <MuonInput
                label="Email"
                placeholder="Enter email"
                id="email"
                type="email"
                onChange={getReferData}
                defaultValue={referData?.email ?? ""}
              />
            </section>
          </div>
          <section className="text-center pt-3 pb-5">
            <MuonButton
              content="Submit"
              className="px-5"
              // disabled={disableNext()}
              onClick={(e) => {
                e.preventDefault();
                mutate(referData);
              }}
            />
          </section>
        </div>
      </section>
    </div>
  );
};

export { ReferStartupFounder };
