import "./investorsHome.css";
import { useState, useContext, useEffect } from "react";
import {
  MuonButton,
  Faq,
  CookieCard,
  InvestorCard,
} from "../../components/index";
import bannerLeft from "../../assets/images/investorBannerImgLeft.png";
import bannerRight from "../../assets/images/investorBannerImgRight.png";
import bannerLeftSm from "../../assets/images/investorBannerImgLeftSm.png";
import bannerRightSm from "../../assets/images/investorBannerImgRightSm.png";
import registerIcon from "../../assets/images/registerIcon.svg";
import findIcon from "../../assets/images/findIcon.svg";
import chatIcon from "../../assets/images/chatIcon.svg";
import investIcon from "../../assets/images/investIcon.svg";
import registerIconSm from "../../assets/images/registerIconSm.svg";
import findIconSm from "../../assets/images/findIconSm.svg";
import chatIconSm from "../../assets/images/chatIconSm.svg";
import investIconSm from "../../assets/images/investIconSm.svg";
import connectImg from "../../assets/images/connectImg.png";
import investImg from "../../assets/images/investImg.png";
import databaseIcon from "../../assets/images/databaseIcon.svg";
import databaseIconSm from "../../assets/images/databaseIconSm.svg";
import networkIcon from "../../assets/images/networkIcon.svg";
import networkIconSm from "../../assets/images/networkIconSm.svg";
import bookingIcon from "../../assets/images/bookingIcon.svg";
import bookingIconSm from "../../assets/images/bookingIconSm.svg";
import timCookLg from "../../assets/images/timCookLg.png";
import timCookSm from "../../assets/images/timCookSm.png";
import { investor } from "../../faqData.json";
import { AuthContext } from "../../context/auth";
import useInvestorsListQuery from "../../queries/investorList";

const InvestorsHome = ({ history }) => {
  const [inView, setInView] = useState(8);
  const [investors, setFounders] = useState([]);
  const auth = useContext(AuthContext);
  const { data: investorsList, isLoading: b } =
    useInvestorsListQuery("investorList");

  useEffect(() => {
    setFounders(investorsList);
  }, [investorsList]);

  const viewMore = () => {
    setInView((prevValue) => prevValue + 8);
  };

  const viewLess = () => {
    setInView(8);
  };

  const openTerms = () => {
    window.open("/terms-conditions", "_blank");
  };

  return (
    <div>
      <CookieCard />
      {/* banner */}
      <section className="row mx-0 muon-investors-banner">
        <article className="col-md-3 muon-investors-left">
          <div>
            <img src={bannerLeft} alt="banner" className="muon-banner-img" />
            <img
              src={bannerLeftSm}
              alt="banner"
              className="muon-banner-img-sm"
            />
          </div>
        </article>
        <article className="col-md-6  d-flex justify-content-center align-items-center">
          <div className="muon-banner-main-content">
            <h1 className="muon-title">Invest into people</h1>
            <h2 className="muon-subtitle">after getting to know them</h2>
            <p className="muon-banner-txt">
              Muon Club connects you with outstanding start-up founders and
              enhances fundraising with technology.
            </p>
            <div className="text-center pt-4">
              {!auth?.isSignedIn && (
                <MuonButton
                  content="Join Muon Club"
                  onClick={() => {
                    history.push("/investor/becomemember");
                  }}
                />
              )}
            </div>
          </div>
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
      {/*End banner */}

      {/* people list */}
      {auth.isSignedIn && (
        <section className="muon-people">
          <div className="muon-people-intro">
            <h3>Browse our database of 25 investors</h3>
            <p className="muon-work-intro-txt">
              Connect and engage with angel and institutional investors, family
              offices, and VC firms.
            </p>
          </div>

          <section className="muon-people-grid">
            {investors?.slice(0, inView).map((investor, i) => (
              <div key={investor?.name + investor?.label + i}>
                <InvestorCard investor={investor} />
              </div>
            ))}
          </section>

          {inView > investors?.length ? (
                    <section className="text-center mb-5">
                          <MuonButton
                      content="View less"
                      className="muon-more-people-btn"
                      onClick={viewLess}
                      />
                    </section>
                    
                  ) : (
                    <section className="text-center mb-5">
                      <MuonButton
                      content="View more"
                      className="muon-more-people-btn"
                      onClick={viewMore}
                    />
                    </section>                
                  )    
              }
            </section>
          )}
      {/*End of people list */}

      {/* How it works */}
      <section className="muon-how">
        <div className="muon-people-intro">
          <h3>How it works</h3>
        </div>

        <section className="muon-how-grid-1">
          <article>
            <div className="d-flex align-items-start">
              <picture>
                <source media="(min-width:767px)" srcset={registerIcon} />
                <source media="(min-width:360px)" srcset={registerIconSm} />
                <img src={registerIcon} alt="register" />
              </picture>
              <div className="muon-how-content-1">
                <p className="muon-how-header">Register</p>
                <p className="muon-how-txt">
                  Sign up and answer a few questions.
                </p>
              </div>
            </div>
          </article>

          <article>
            <div className="d-flex align-items-start">
              <picture>
                <source media="(min-width:767px)" srcset={findIcon} />
                <source media="(min-width:360px)" srcset={findIconSm} />
                <img src={findIcon} alt="find your match" />
              </picture>
              <div className="muon-how-content-1">
                <p className="muon-how-header">Browse your matches</p>
                <p className="muon-how-txt">
                  We will match you with the founders that fulfill your
                  criteria.
                </p>
              </div>
            </div>
          </article>

          <article>
            <div className="d-flex align-items-start">
              <picture>
                <source media="(min-width:767px)" srcset={chatIcon} />
                <source media="(min-width:360px)" srcset={chatIconSm} />
                <img src={chatIcon} alt="Have a chat" />
              </picture>
              <div className="muon-how-content-1">
                <p className="muon-how-header">Have a chat</p>
                <p className="muon-how-txt">
                  Set up a call and get to know the founder.
                </p>
              </div>
            </div>
          </article>

          <article>
            <div className="d-flex align-items-start">
              <picture>
                <source media="(min-width:767px)" srcset={investIcon} />
                <source media="(min-width:360px)" srcset={investIconSm} />
                <img src={investIcon} alt="Take a trip & Invest" />
              </picture>
              <div className="muon-how-content-1">
                <p className="muon-how-header">Sign the deal</p>
                <p className="muon-how-txt">
                  Invest in the person behind an outstanding idea.
                </p>
              </div>
            </div>
          </article>
        </section>
        <section className="text-center mt-5">
          {!auth?.isSignedIn && (
            <MuonButton
              content="Join Muon Club"
              onClick={() => {
                history.push("/investor/becomemember");
              }}
            />
          )}
          <p className="muon-terms">
            By proceeding further, you agree to our{" "}
            <span className="muon-terms-link" onClick={openTerms}>
              Terms & Conditions
            </span>
          </p>
        </section>
      </section>
      {/*End of How it works */}

      {/*what muon gives*/}
      <section className="muon-what">
        <h3>
          What <b>Muon club</b> membership gives you
        </h3>
        <section
          className="d-flex justify-content-center nowrap"
          style={{ overflowX: "auto" }}
        >
          <div className="muon-what-item">
            <img src={connectImg} alt="connect" />
            <h6>Connect</h6>
            <p>
              Connect with exceptional start-up founders who match your
              criteria.
            </p>
          </div>

          {/* <div className="muon-what-item">
            <img src={vr} alt="connect" />
            <h6>VR technology</h6>
            <p>
              Speed up the fundraising process by leveraging VR capabilities.
            </p>
          </div> */}

          <div className="muon-what-item">
            <img src={investImg} alt="connect" />
            <h6>Invest</h6>
            <p>
              Our platform makes it easy to connect, interact, and seal deals
            </p>
          </div>
        </section>
      </section>
      {/*End what muon gives*/}

      {/* benefit */}
      <section className="muon-how">
        <div className="muon-people-intro">
          <h3>Your benefits</h3>
        </div>

        <section className="muon-how-grid">
          <article>
            <div>
              <picture>
                <source media="(min-width:767px)" srcset={databaseIcon} />
                <source media="(min-width:360px)" srcset={databaseIconSm} />
                <img src={databaseIconSm} alt="large database" />
              </picture>
              <div className="muon-how-content">
                <p className="muon-how-header">Large Database</p>
                <p className="muon-how-txt">
                  The largest database of vetted and screened start-ups.
                </p>
              </div>
            </div>
          </article>

          <article>
            <div>
              <picture>
                <source media="(min-width:767px)" srcset={networkIcon} />
                <source media="(min-width:360px)" srcset={networkIconSm} />
                <img src={networkIconSm} alt="Extensive Network" />
              </picture>
              <div className="muon-how-content">
                <p className="muon-how-header">Extensive Network</p>
                <p className="muon-how-txt">
                  An extensive network of like-minded investors and business
                  leaders across the world.
                </p>
              </div>
            </div>
          </article>

          <article>
            <div>
              <picture>
                <source media="(min-width:767px)" srcset={networkIcon} />
                <source media="(min-width:360px)" srcset={networkIconSm} />
                <img src={networkIconSm} alt="Extensive Network" />
              </picture>
              <div className="muon-how-content">
                <p className="muon-how-header">VR technology</p>
                <p className="muon-how-txt">
                  Speed up the fundraising process by leveraging VR
                  capabilities.
                </p>
              </div>
            </div>
          </article>

          <article>
            <div className="">
              <picture>
                <source media="(min-width:767px)" srcset={bookingIcon} />
                <source media="(min-width:360px)" srcset={bookingIconSm} />
                <img src={bookingIconSm} alt="Automatic Booking" />
              </picture>
              <div className="muon-how-content">
                <p className="muon-how-header">Intuitive functionality</p>
                <p className="muon-how-txt">
                  Our platform is designed to prove you with a seamless
                  experience making it easy to connect, interact, and seal
                  deals..
                </p>
              </div>
            </div>
          </article>
        </section>
      </section>
      {/* end of benefits */}

      {/* Muon quote from Tim cook */}
      {/* <section className="muon-quote d-flex align-items-center py-3">
        <div
          className="d-flex align-items-center h-100 flex-wrap"
          style={{
            columnGap: "3%",
            position: "relative",
            maxWidth: 1440,
            margin: "0 auto",
          }}
        >
          <h1 className="mb-0 big-quote">“</h1>
          <p className="muon-quote-text" style={{ position: "relative" }}>
            We believe in saying no to thousands of projects so that we can
            really focus on the few that are truly important and meaningful to
            us. <i>-Tim Cook</i>
            <h1
              className="mb-0 big-quote d_none"
              style={{ right: 0, transform: "rotateZ(180deg)" }}
            >
              “
            </h1>
          </p>
          <picture className="muon-quote-img">
            <source
              media="(min-width: 450px)"
              srcset={timCookLg}
              className="w-100"
            />
            <source
              media="(min-width: 320px)"
              srcset={timCookSm}
              className="w-100"
            />
            <img src={timCookSm} alt="Tim Cook" className="w-100" />
          </picture>
        </div>
      </section> */}
      {/*End Muon quote from Tim cook */}

      <section>
        <Faq data={investor} />
      </section>
    </div>
  );
};

export { InvestorsHome };
