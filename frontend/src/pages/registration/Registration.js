import React, { useState, useLayoutEffect } from "react";
import { MuonButton } from "../../components/index";
import backArrow from "../../assets/images/questionnaireBackArrow.svg";
import Register1 from "./components/Register1";
import Register2 from "./components/Register2";
import "./registration.css";
const Registration = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [step, setStep] = useState(1);

  const [registerData, setRegisterData] = useState({});

  const handleDataCollection = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  /**
   * Function to move set step to the next number
   */
  const handleNext = () => {
    if (step < 12) {
      setStep(step + 1);
    }
  };

  const goBack = () => {
    setStep((step) => step - 1);
  };

  const disableNext = () => {
    if (
      step === 1 &&
      registerData?.full_name?.length > 0 &&
      registerData?.email?.length > 0
    ) {
      return false;
    }

    if (
      step === 2 &&
      registerData?.startup_name?.length > 0 &&
      registerData?.startup_country?.length > 0 &&
      registerData?.office_address?.length > 0
    ) {
      return false;
    }

    return true;
  };

  const registrationSteps = {
    1: <Register1 getData={handleDataCollection} data={registerData} />,
    2: <Register2 getData={handleDataCollection} data={registerData} />,
  };

  return (
    <div className="muon-become">
      <section
        className="row mx-0 h-100"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <div className="col-md-6 muon-register-bg">
          <div className="muon-become-txt">
            <h1 className="muon-become-header">Register with us</h1>
            <p className="muon-become-subheader">
              Muon Club organizes exclusive events and getaways for
              <br className="muon-register-br" /> investors and start-up
              founders.
            </p>
          </div>
        </div>
        <div className="col-md-6 d-flex flex-column align-items-center px-0">
          <div className="muon-become-steps">
            {step > 1 && (
              <section>
                <img
                  src={backArrow}
                  alt="back"
                  role="button"
                  className="muon-become-back"
                  onClick={goBack}
                />
              </section>
            )}
            <section className="muon-refer-form-header">
              <h3>Create an account and become a member</h3>
            </section>

            {registrationSteps[step]}
          </div>
          <section className="text-center pt-3 pb-5">
            {step === Object.keys(registrationSteps).length ? (
              <>
                <MuonButton
                  content="Submit"
                  className="px-5"
                  disabled={disableNext()}
                />
                <p className="muon-register-terms mx-4">
                  By proceeding further they are agreeing to our{" "}
                  <a href="/terms-conditions">
                    Terms & Conditions and Privacy Policy
                  </a>
                </p>
              </>
            ) : (
              <MuonButton
                content="Continue"
                className="px-5"
                onClick={handleNext}
                disabled={disableNext()}
              />
            )}
          </section>
        </div>
      </section>
    </div>
  );
};

export { Registration };
