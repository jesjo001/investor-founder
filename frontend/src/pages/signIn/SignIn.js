import { useContext, useState, useEffect } from "react";
import "./signIn.css";
import {
  MuonButton,
  MuonInput,
  ForgotPasswordModal,
} from "../../components/index";
import bannerLeft from "../../assets/images/investorBannerImgLeft.png";
import bannerRight from "../../assets/images/investorBannerImgRight.png";
import bannerLeftSm from "../../assets/images/investorBannerImgLeftSm.png";
import bannerRightSm from "../../assets/images/investorBannerImgRightSm.png";
import { signIn, checkPlanStatus } from "../../utils/auth";
import { useHistory } from "react-router";
import { AuthContext } from "../../context/auth";
import { AlertContext } from "../../context/alert";

const SignIn = () => {
  const { isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const [signInData, setSignInData] = useState();
  const [status, setStatus] = useState();
  const history = useHistory();

  let { setOn, setAlertContent } = useContext(AlertContext);

  useEffect(() => {
    planStatus();
  });

  const planStatus = async () => {
    const resp = await checkPlanStatus();
    setStatus(resp);
  };

  if (isSignedIn) {
    switch (localStorage.getItem("role")) {
      case "Investor":
        history.push("/investor/dashboard");
        setIsSignedIn(true);
        break;
      case "Founder":
        const subStat =
          localStorage.subscriptionStatus === "true" ? true : false;

        if (subStat === false) {
          history.push("/pricing");
        } else {
          history.push("/founder/dashboard");
        }
        // history.push("/founder/dashboard");
        setIsSignedIn(true);
        break;
      default:
        setIsSignedIn(false);
    }
  }

  /**
   * Function for getting value from input fields and saving in signInData
   * @param {*} e event variable of the input
   */
  const getSignInData = (e) => {
    setSignInData({ ...signInData, [e.target.id]: e.target.value });
  };

  return (
    <section className="row mx-0 muon-investors-banner auth-space">
      <ForgotPasswordModal />
      <article className="col-md-3 muon-investors-left">
        <div>
          <img src={bannerLeft} alt="banner" className="muon-banner-img" />
          <img src={bannerLeftSm} alt="banner" className="muon-banner-img-sm" />
        </div>
      </article>
      <article className="col-md-6  d-flex justify-content-center align-items-center">
        <section className="muon-auth">
          <h2>Sign in to Muon Club</h2>
          <p>
            Muon Club organizes exclusive events and getaways for
            <br /> investors and start-up founders.
          </p>
          <form>
            <MuonInput
              type="email"
              label="Email id"
              placeholder="Enter email address"
              id="email"
              onChange={getSignInData}
              defaultValue={signInData?.email ?? ""}
            />
            <MuonInput
              type="password"
              label="Password"
              placeholder="Enter password"
              id="password"
              className="mb-1"
              onChange={getSignInData}
              defaultValue={signInData?.password ?? ""}
            />
            <section className="d-flex mb-3">
              <p
                className="mb-0 muon-forgot-action"
                data-toggle="modal"
                data-target="#forgotModal"
              >
                Forgot your password?
              </p>
            </section>
            <div className="text-center">
              <MuonButton
                content="Sign in"
                className="px-5"
                onClick={(e) => {
                  e.preventDefault();
                  signIn(
                    signInData,
                    history,
                    setIsSignedIn,
                    setAlertContent,
                    setOn
                  );
                }}
              />
              <p className="mt-2">
                Don't have an account yet?{" "}
                <a href="/investor/becomemember">Click here</a>
              </p>
            </div>
          </form>
        </section>
      </article>
      <article className="col-md-3 muon-investors-right">
        <div>
          <img src={bannerRight} alt="banner" className="muon-banner-img" />
          <img
            src={bannerRightSm}
            alt="banner"
            className="muon-banner-img-sm"
          />
        </div>
      </article>
    </section>
  );
};

export { SignIn };
