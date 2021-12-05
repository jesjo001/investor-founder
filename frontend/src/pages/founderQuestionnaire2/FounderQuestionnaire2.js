import React, { useLayoutEffect, useState, useContext } from "react";
import { MuonButton, ProgressBar } from "../../components/index";
import backArrow from "../../assets/images/questionnaireBackArrow.svg";
import IndustryChoice from "./components/IndustryChoice";
import StartupSolution from "./components/StartupSolution";
import "./founderQuestionnaire2.css";
import AboutStartup from "./components/AboutStartup";
import StartupWorth from "./components/StartupWorth";
import MoneyRequired from "./components/MoneyRequired";
import PitchDeckLink from "./components/PitchDeckLink";
import Register1 from "./components/Register1";
import Register2 from "./components/Register2";
import ContactStartUp from "./components/ContactStartUp";
import StartupStage from "./components/StartupStage";
import WhyNow from "./components/WhyNow";
import StartupCompetition from "./components/StartupCompetition";
import { useMutation } from "react-query";
import founderQuestionnaireMutation2 from "../../mutations/founderQuestionnaire2";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { signIn } from "../../utils/auth";
import { AlertContext } from "../../context/alert";
import { emailRegex } from "../../utils/rest";
import BurnRate from "./components/BurnRate";
import successCheck from "../../assets/images/success-standard-line.svg";

const FounderQuestionnaire2 = ({ location }) => {
  const { setIsSignedIn } = useContext(AuthContext);
  const history = useHistory();
  const [step, setStep] = useState(1);
  const params = new URLSearchParams(location.search);
  const { setOn, setAlertContent } = useContext(AlertContext);
  const [success, setSuccess] = useState(false);

  const { mutate } = useMutation(

      (data) => founderQuestionnaireMutation2(data),
      {
        onError: (err) => {
          const message =  err.response.data.errors
              ? err.response.data.errors.map((item)=>{return item+".\n"})
              : err.response.data.error;
          setAlertContent({
            title: "Error!",
            message,
            success: false,
          });
          setOn(true);
          // alert("Unable to create founder.");
        },
        onSuccess: async (data) => {
          setAlertContent({
            title: "Success!",
            message: "Application Submitted",
            success: true,
          });
          setOn(true);
          setSuccess(true);
        },
      }
  );
  const [questionnaire, setQuestionnaire] = useState({});

  const handleDataCollection = (e) => {
    setQuestionnaire({ ...questionnaire, [e.target.name]: e.target.value });
  };

  const handleDropDownCollection = (name, value) => {
    setQuestionnaire({ ...questionnaire, [name]: value });
  };

  const handlePitchDeckLink = (name, value) => {
    setQuestionnaire({ ...questionnaire, pitchDeckLink: value });
  };

  const disableNext = () => {
    if (
        step === 1 &&
        questionnaire?.fullName?.length > 0 &&
        !/\d/.test(questionnaire?.fullName) &&
        questionnaire?.email?.length > 0 &&
        emailRegex.test(questionnaire?.email)
    ) {
      return false;
    }
    if (
        step === 2 &&
        questionnaire?.startUpName?.length > 0 &&
        questionnaire?.established?.length > 0
    ) {
      return false;
    }
    if (step === 3 && questionnaire?.aboutUs?.length > 0) {
      return false;
    }
    if (
        step === 4 &&
        questionnaire?.companyEmail?.length > 0 &&
        questionnaire?.companyAddress?.length > 0 &&
        emailRegex.test(questionnaire?.companyEmail)
    ) {
      return false;
    }

    if (
        step === 5 &&
        questionnaire?.numOfCoFounders?.length > 0 &&
        questionnaire?.companyStage?.length > 0
    ) {
      return false;
    }
    if (
        step === 6 &&
        questionnaire?.industryType?.length > 0 &&
        questionnaire?.problemStatement?.length > 0
    ) {
      return false;
    }

    if (step === 7 && questionnaire?.companySolution?.length > 0) {
      return false;
    }

    if (step === 8 && questionnaire?.whyOurCompany?.length > 0) {
      return false;
    }

    if (
        step === 9 &&
        questionnaire?.myCompetitors?.length > 0 &&
        questionnaire?.ourAdvantage?.length > 0
    ) {
      return false;
    }
    if (step === 10 && questionnaire?.burnRate?.length > 0) {
      return false;
    }
    if (
        step === 11 &&
        questionnaire?.amountToRaise?.length > 0 &&
        questionnaire?.madeProfit?.length > 0
    ) {
      return false;
    }
    if (
        step === 12 &&
        questionnaire?.amountRaised?.length > 0 &&
        questionnaire?.milestones?.length > 0 &&
        questionnaire?.fundAllocation?.length > 0
    ) {
      return false;
    }
    if (step === 13 && questionnaire?.pitchDeckLink?.length > 0) {
      return false;
    }

    return true;
  };

  /**
   * Function to move set step to the next number
   */
  const handleNext = (currentStep) => {
    if (step < Object.keys(founderQuestionStep).length) {
      if (currentStep === 6 && questionnaire?.has_co_founders === "false") {
        setStep(step + 2);
      } else {
        setStep(step + 1);
      }
    } else {
      history.goBack();
    }
  };

  /**
   * Function that determines when to show the skip option
   * @param {Number} currentStep
   * @returns {Boolean}
   */
  const isSkip = (currentStep) => {
    if (currentStep === null) {
      return true;
    }
    return false;
  };

  const goBack = (currentStep) => {
    if (step > 1) {
      if (currentStep === 8 && questionnaire?.has_co_founders === "false") {
        setStep((step) => step - 2);
      } else {
        setStep((step) => step - 1);
      }
    } else {
      history.goBack();
    }
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const founderQuestionStep = {
    1: <Register1 getData={handleDataCollection} data={questionnaire} />,
    2: <Register2 getData={handleDataCollection} data={questionnaire} />,
    3: <AboutStartup getData={handleDataCollection} data={questionnaire} />,
    4: <ContactStartUp getData={handleDataCollection} data={questionnaire} />,
    5: (
        <StartupStage
            data={questionnaire}
            getDropdownData={handleDropDownCollection}
            getData={handleDataCollection}
        />
    ),
    6: (
        <IndustryChoice
            getDropdownData={handleDropDownCollection}
            getData={handleDataCollection}
            data={questionnaire}
        />
    ),
    7: <StartupSolution data={questionnaire} getData={handleDataCollection} />,
    8: <WhyNow getData={handleDataCollection} data={questionnaire} />,
    9: (
        <StartupCompetition getData={handleDataCollection} data={questionnaire} />
    ),
    10: <BurnRate data={questionnaire} getData={handleDataCollection} />,
    11: (
        <MoneyRequired
            getDropdownData={handleDropDownCollection}
            getData={handleDataCollection}
            data={questionnaire}
        />
    ),
    12: (
        <StartupWorth
            getDropdownData={handleDropDownCollection}
            getData={handleDataCollection}
            data={questionnaire}
        />
    ),
    13: !success ? (
        <PitchDeckLink getDropdownData={handleDropDownCollection} getData={handlePitchDeckLink} data={questionnaire} />
    ) : (
        <div className="text-center">
          <img src={successCheck} alt="success" />
          <p className="signup-success-header">
            Thanks for submitting your application!
          </p>
          <p className="signup-success-text">
            We’ll get in touch with you within 5 business days. If you have any
            questions, drop us a line at{" "}
            <a href="mailto:info@muon.club">info@muon.club</a>
          </p>
        </div>
    ),
  };

  return (
      <div className="muon-become">
        <section
            className="row mx-0 h-100"
            style={{ minHeight: "calc(100vh - 80px)" }}
        >
          <div className="col-md-6 muon-founder-become-bg2">
            <div className="muon-become-txt">
              <h1 className="muon-become-header">
                Sign up to connect with investors and fundraise with ease
              </h1>
            </div>
          </div>
          <div className="col-md-6 d-flex flex-column align-items-center px-0">
            <div className="muon-become-steps">
              {!success && step !== 1 && (
                  <section>
                    <img
                        src={backArrow}
                        alt="back"
                        role="button"
                        className="muon-become-back"
                        onClick={() => goBack(step)}
                    />
                  </section>
              )}
              {!success && (
                  <section>
                    <h3>
                      {step > 1
                          ? "Great! Now tell us about your start-up"
                          : "Tell us about yourself"}
                    </h3>
                    <div className="muon-progress-wrap">
                      <p>
                        <b>
                          {step < 10 && "0"}
                          {step}
                        </b>
                        /{Object.keys(founderQuestionStep).length}
                      </p>
                      <ProgressBar
                          currentLevel={step}
                          numberOfLevels={Object.keys(founderQuestionStep).length}
                      />
                    </div>
                  </section>
              )}

              {founderQuestionStep[step]}
            </div>
            {!success && (
                <section className="text-center pt-3 pb-5">
                  {step === Object.keys(founderQuestionStep).length ? (
                      <MuonButton
                          content="Submit Your Application"
                          className="px-5"
                          onClick={(e) => {
                            e.preventDefault();
                            mutate({
                              ...questionnaire,
                            });
                          }}
                      />
                  ) : (
                      <MuonButton
                          content="Next"
                          className="px-5"
                          onClick={() => handleNext(step)}
                          disabled={disableNext()}
                      />
                  )}

                  {isSkip(step) && (
                      <p className="muon-step-skip" onClick={() => handleNext(step)}>
                        Skip
                      </p>
                  )}
                </section>
            )}
          </div>
        </section>
      </div>
  );
};

export { FounderQuestionnaire2 };
