import React, {
  useState,
  useLayoutEffect,
  useContext,
  useRef,
  useEffect,
} from "react";
import axios from 'axios';
import { useHistory } from "react-router";
import "./becomeMember.css";
import {
  MuonButton,
  ProgressBar,
  SuccessfulSignUp,
  EmailSentModal,
} from "../../components/index";
import NameEmail from "./components/NameEmail";
import Personal from "./components/Personal";
import Expertise from "./components/Expertise";
import InvestorType from "./components/InvestorType";
import StartUpInvestment from "./components/StartUpInvestment";
import TicketSize from "./components/TicketSize";
import StageOfInvestment from "./components/StageOfInvestment";
import IndustryChoice from "./components/IndustryChoice";
import StartUpLocation from "./components/StartUpLocation";
import backArrow from "../../assets/images/questionnaireBackArrow.svg";
import UploadPhoto from "./components/UploadPhoto";
import { AuthContext } from "../../context/auth";
import { signIn } from "../../utils/auth";
import { closeModal, delay, openModal, emailRegex } from "../../utils/rest";
import { AlertContext } from "../../context/alert";
import { toFormData } from '../../utils/rest';
import { API_PATH } from '../../utils/constants';

const BecomeMember = () => {
  const [step, setStep] = useState(1);
  const history = useHistory();
  const { setIsSignedIn } = useContext(AuthContext);
  const { setOn, setAlertContent } = useContext(AlertContext);
  const [questionnaire, setQuestionnaire] = useState({});

  const createInvestor = async data => {
    try {
      const formData = toFormData(data);
      await axios({
        url: `${API_PATH}/investor/signup`,
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      openModal("signUpModal");
      await delay(1000);
      closeModal("signUpModal");
      await signIn(
        { email: data.email, password: data.password },
        history,
        setIsSignedIn
      );
    } catch (err) {
      const message =  err.response.data.errors
      ? err.response.data.errors.map((item)=>{return item+".\n"})
      : err.response.data.error;
      setAlertContent({
        title: "Error!",
        message,
        success: false,
      });
      setOn(true);
    }
  }

  const handleDataCollection = (e) => {
    setQuestionnaire({ ...questionnaire, [e.target.name]: e.target.value });
  };

  const handleDropDownCollection = (name, value) => {
    setQuestionnaire({ ...questionnaire, [name]: value });
  };

  const handleFileUpload = (e) => {
    console.log("file", e.target.files[0]);
    setQuestionnaire({ ...questionnaire, [e.target.name]: e.target.files[0] });
  };

  const disableNext = () => {
    if (
      step === 1 &&
      questionnaire?.name?.length > 0 &&
      !/\d/.test(questionnaire?.name) &&
      questionnaire?.email?.length > 0 &&
      emailRegex.test(questionnaire?.email) &&
      questionnaire?.password?.length >= 12 &&
      /\d/.test(questionnaire?.password) &&
      /[A-Z]/.test(questionnaire?.password)
    ) {
      return false;
    }
    if (step === 2 && questionnaire?.personal?.length > 0) {
      return false;
    }

    if (step === 3 && questionnaire?.investor_type?.length > 0) {
      return false;
    }
    if (step === 4 && questionnaire?.expertise?.length > 0) {
      return false;
    }

    if (step === 5 && questionnaire?.invested_startup?.length > 0) {
      return false;
    }

    if (step === 6 && questionnaire?.ticketSize?.length > 0) {
      return false;
    }

    if (step === 7 && questionnaire?.stage?.length > 0) {
      return false;
    }
    if (step === 8 && questionnaire?.industryType?.length > 0) {
      return false;
    }
    if (step === 9 && questionnaire?.industryLocation?.length > 0) {
      return false;
    }
    if (step === 10 && JSON.stringify(questionnaire?.avatar) === "{}") {
      return false;
    }
    return true;
  };

  const becomeMemberSteps = {
    1: <NameEmail getData={handleDataCollection} data={questionnaire} />,
    2: <Personal getData={handleDataCollection} data={questionnaire} />,
    3: <InvestorType getData={handleDataCollection} data={questionnaire} />,
    4: <Expertise getData={handleDataCollection} data={questionnaire} />,
    5: (
      <StartUpInvestment getData={handleDataCollection} data={questionnaire} />
    ),
    6: <TicketSize getData={handleDropDownCollection} data={questionnaire} />,
    7: (
      <StageOfInvestment
        getData={handleDropDownCollection}
        data={questionnaire}
      />
    ),
    8: (
      <IndustryChoice getData={handleDropDownCollection} data={questionnaire} />
    ),
    9: (
      <StartUpLocation
        getData={handleDropDownCollection}
        data={questionnaire}
      />
    ),
    10: <UploadPhoto getData={handleFileUpload} data={questionnaire} />,
  };

  /**
   * Function to move set step to the next number
   */
  const handleNext = () => {
    if (step < 10) {
      setStep(step + 1);
    }
  };


  // implementation of next on enter
   const nextBtn = document.getElementById("next");
  useEffect(() => {
    console.log(`nextRef`, nextBtn);
    document.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && !disableNext()) {
        console.log(`e.key`, e.key);
        handleNext();
      }
    });
  });

  /**
   * Function that determines when to show the skip option
   * @param {Number} currentStep
   * @returns {Boolean}
   */
  const isSkip = (currentStep) => {
    if (currentStep === 5) {
      return true;
    }
    return false;
  };

  const goBack = () => {
    setStep((step) => step - 1);
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="muon-become">
      {/* open modal by using openModal(id) function with id passed ids are "emailModal" and "signUpModal" respectively */}
      <EmailSentModal />
      <SuccessfulSignUp />
      <section
        className="row mx-0 h-100"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <div className="col-md-6 muon-become-bg">
          <div className="muon-become-txt">
            <h1 className="muon-become-header">Become a member</h1>
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
            <section>
              <h3>Tell us about yourself and join the club</h3>
              <div className="muon-progress-wrap">
                <p>
                  <b>
                    {step < 10 && "0"}
                    {step}
                  </b>
                  /10
                </p>
                <ProgressBar currentLevel={step} numberOfLevels={10} />
              </div>
            </section>

            {becomeMemberSteps[step]}
          </div>
          <section className="text-center pt-3 pb-5">
            {step === 10 ? (
              <MuonButton
                content="Submit"
                className="px-5"
                disabled={disableNext()}
                onClick={(e) => {
                  e.preventDefault();
                  createInvestor(questionnaire);
                }}
              />
            ) : (
              <MuonButton
                content="Next"
                className="px-5"
                onClick={handleNext}
                disabled={disableNext()}
                id="next"
              />
            )}

            {isSkip(step) && (
              <p className="muon-step-skip" onClick={handleNext}>
                Skip
              </p>
            )}
          </section>
        </div>
      </section>
    </div>
  );
};

export { BecomeMember };
