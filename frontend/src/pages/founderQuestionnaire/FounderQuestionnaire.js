import React, { useLayoutEffect, useState, useContext } from "react";
import { MuonButton, ProgressBar } from "../../components/index";
import backArrow from "../../assets/images/questionnaireBackArrow.svg";
import Expertise from "./components/Expertise";
import IndustryChoice from "./components/IndustryChoice";
import StartUpEst from "./components/StartUpEst";
import CoFounders from "./components/CoFounders";
import FindCoFounder from "./components/FindCoFounder";
import "./founderQuestionnaire.css";
import AboutStartup from "./components/AboutStartup";
import StageOfInvestment from "./components/StageOfInvestment";
import StartupWorth from "./components/StartupWorth";
import MoneyRequired from "./components/MoneyRequired";
import FindInvestor from "./components/FindInvestor";
import PitchDeckLink from "./components/PitchDeckLink";
import UploadPhoto from "./components/UploadPhoto";
import Register1 from "./components/Register1";
import Register2 from "./components/Register2";
import { UploadLogo } from "./components/UploadLogo";
import { useMutation } from "react-query";
import founderQuestionnaireMutation from "../../mutations/founderQuestionnaire";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { signIn } from "../../utils/auth";
import { AlertContext } from "../../context/alert";
import { emailRegex } from "../../utils/rest";

const FounderQuestionnaire = ({ location }) => {
  const { setIsSignedIn } = useContext(AuthContext);
  const history = useHistory();
  const [step, setStep] = useState(1);
  const params = new URLSearchParams(location.search);
  const { setOn, setAlertContent } = useContext(AlertContext);

  const { mutate } = useMutation((data) => founderQuestionnaireMutation(data), {
    onError: (error) => {     
      setAlertContent({
        title: "Error!",
        message: error?.response?.data?.message ?? "Unable to create founder.",
        success: false,
      });
      setOn(true);
      // alert("Unable to create founder.");
    },
    onSuccess: async (data) => {
      console.log(data);
      setAlertContent({
        title: "Success!",
        message: "Founder created",
        success: true,
      });
      setOn(true);
      // alert("Founder Created");
      await signIn(
        { email: questionnaire.email, password: questionnaire.password },
        history,
        setIsSignedIn
      );
    },
  });
  const [questionnaire, setQuestionnaire] = useState({});

  const handleDataCollection = (e) => {
    setQuestionnaire({ ...questionnaire, [e.target.name]: e.target.value });
  };

  const handleDropDownCollection = (name, value) => {
    setQuestionnaire({ ...questionnaire, [name]: value });
  };

  const handleFileUpload = (e) => {
    setQuestionnaire({ ...questionnaire, [e.target.name]: e.target.files[0] });
  };

  const handlePitchDeckLink = (name,value) => {
    // if (questionnaire?.pitch_deck_link?.size > 1047590) {
    //   setAlertContent({
    //     title: "Error!",
    //     message: "Pitch deck should not be more than 1MB",
    //     success: false,
    //   });
    //   setOn(true);
    // }
   
    setQuestionnaire({ ...questionnaire, pitch_deck_link: value });
  };

  const disableNext = () => {
    if (
      step === 1 &&
      questionnaire?.full_name?.length > 0 &&
      !/\d/.test(questionnaire?.name) &&
      questionnaire?.email?.length > 0 &&
      emailRegex.test(questionnaire?.email) &&
      questionnaire?.password?.length >= 12 &&
      /\d/.test(questionnaire?.password) &&
      /[A-Z]/.test(questionnaire?.password)
    ) {
      return false;
    }
    if (
      step === 2 &&
      questionnaire?.startup_name?.length > 0 &&
      questionnaire?.startup_country?.length > 0 &&
      questionnaire?.office_address?.length > 0 &&
      questionnaire?.website_url?.length > 0
    ) {
      return false;
    }
    if (step === 3 && questionnaire?.expertise?.length > 0) {
      return false;
    }
    if (step === 4 && questionnaire?.industryType?.length > 0) {
      return false;
    }

    if (step === 5 && questionnaire?.startup_est_date?.length > 0) {
      return false;
    }
    if (step === 6 && questionnaire?.has_co_founders) {
      return false;
    }

    if (step === 7 && questionnaire?.cofounder?.length > 0) {
      return false;
    }

    if (step === 8 && questionnaire?.about_startup?.length > 0) {
      return false;
    }

    if (step === 9 && questionnaire?.stage?.length > 0) {
      return false;
    }
    if (step === 10 && questionnaire?.ticketRaised?.length > 0) {
      return false;
    }
    if (step === 11 && questionnaire?.ticketToRaise?.length > 0) {
      return false;
    }
    if (step === 12 && questionnaire?.investor?.length > 0) {
      return false;
    }
    if (
      step === 13 && questionnaire?.pitch_deck_link ?.length > 0
    ) {
      return false;
    }
    if (step === 14 && JSON.stringify(questionnaire?.photo) === "{}") {
      return false;
    }
    if (step === 15 && JSON.stringify(questionnaire?.logo) === "{}") {
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
      // setStep(step + 1);
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
    3: <Expertise getData={handleDataCollection} data={questionnaire} />,
    4: (
      <IndustryChoice getData={handleDropDownCollection} data={questionnaire} />
    ),
    5: <StartUpEst getData={handleDataCollection} data={questionnaire} />,
    6: <CoFounders getData={handleDataCollection} data={questionnaire} />,
    7: (
      <FindCoFounder getData={handleDropDownCollection} data={questionnaire} />
    ),
    8: <AboutStartup getData={handleDataCollection} data={questionnaire} />,
    9: (
      <StageOfInvestment
        getData={handleDropDownCollection}
        data={questionnaire}
      />
    ),
    10: (
      <StartupWorth getData={handleDropDownCollection} data={questionnaire} />
    ),
    11: (
      <MoneyRequired getData={handleDropDownCollection} data={questionnaire} />
    ),
    12: (
      <FindInvestor getData={handleDropDownCollection} data={questionnaire} />
    ),
    13: <PitchDeckLink getData={handlePitchDeckLink} data={questionnaire} />,
    14: <UploadPhoto getData={handleFileUpload} data={questionnaire} />,
    15: <UploadLogo getData={handleFileUpload} data={questionnaire} />,
  };

  return (
    <div className="muon-become">
      <section
        className="row mx-0 h-100"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <div className="col-md-6 muon-founder-become-bg">
          <div className="muon-become-txt">
            <h1 className="muon-become-header">Become a member</h1>
          </div>
        </div>
        <div className="col-md-6 d-flex flex-column align-items-center px-0">
          <div className="muon-become-steps">
            {
              <section>
                <img
                  src={backArrow}
                  alt="back"
                  role="button"
                  className="muon-become-back"
                  onClick={() => goBack(step)}
                />
              </section>
            }
            <section>
              <h3>Tell us about yourself and join the club</h3>
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

            {founderQuestionStep[step]}
          </div>
          <section className="text-center pt-3 pb-5">
            {step === Object.keys(founderQuestionStep).length ? (
              <MuonButton
                content="Finish"
                className="px-5"
                // disabled={disableNext()}
                onClick={(e) => {
                  e.preventDefault();
                  mutate({
                    referredBy: params.get("referredBy"),
                    id: params.get("id"),
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
        </div>
      </section>
    </div>
  );
};

export { FounderQuestionnaire };
