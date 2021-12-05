import React, { useState, useContext, useEffect } from "react";
import "./founderHome.css";
import { MuonButton, PersonCard, Faq, CookieCard } from "../../components";
import findIcon from "../../assets/images/findIcon.svg";
import chatIcon from "../../assets/images/chatIcon.svg";
import investIcon from "../../assets/images/investIcon.svg";
import findIconSm from "../../assets/images/findIconSm.svg";
import chatIconSm from "../../assets/images/chatIconSm.svg";
import investIconSm from "../../assets/images/investIconSm.svg";
import signUpIcon from "../../assets/images/signUpIcon.svg";
import signUpIconSm from "../../assets/images/signUpIconSm.svg";
import databaseIcon from "../../assets/images/databaseIcon.svg";
import databaseIconSm from "../../assets/images/databaseIconSm.svg";
import unlimitedIcon from "../../assets/images/unlimitedIcon.svg";
import unlimitedIconSm from "../../assets/images/unlimitedIconSm.svg";
import benefitsIcon from "../../assets/images/benefitsIcon.svg";
import benefitsIconSm from "../../assets/images/benefitsIconSm.svg";
import referralsIcon from "../../assets/images/referralsIcon.svg";
import referralsIconSm from "../../assets/images/referralsIconSm.svg";
import bannerLeft from "../../assets/images/founderBannerLeft.png";
import bannerLeftSm from "../../assets/images/founderBannerLeftSm.png";
import bannerRight from "../../assets/images/founderBannerRight.png";
import bannerRightSm from "../../assets/images/founderBannerRightSm.png";
import timCookLg from "../../assets/images/timCookLg.png";
import timCookSm from "../../assets/images/timCookSm.png";
import ConnectWithInvestor from "../../assets/images/conectWIthInvestor.png";
import exposure from "../../assets/images/increaseExpo.png";
import likeMinds from "../../assets/images/likeMinds.png";
import referral from "../../assets/images/referral.png";
import vr from "../../assets/images/vr.jpg";
import { founder } from "../../faqData.json";
import { AuthContext } from "../../context/auth";
import { API_PATH } from "../../utils/constants";
import axios from "axios";
import useInvestorsListQuery from "../../queries/investorList";
import useFoundersListQuery from "../../queries/founderList";

const FounderHome = ({ history }) => {
  const { data: foundersList, isLoading: c } =
    useFoundersListQuery("founderList");

  const [founders, setFounders] = useState([]);

  useEffect(() => {
    setFounders(foundersList);
  }, [foundersList]);

  const auth = useContext(AuthContext);
  const initialView = 8;

  const [inView, setInView] = useState(initialView);

  const viewMore = () => {
    setInView(founders?.length);
  };

  const viewLess = () => {
    setInView(initialView);
  };

  // const openTerms = () => {
  //   window.open("/terms-conditions", "_blank");
  // };
  return (
    <div style={{ position: "relative" }}>
      <CookieCard />
      {/* banner */}
      <section className="row mx-0 muon-investors-banner muon-founder-banner">
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
            <h1 className="muon-title">Receive Investment</h1>
            <h2 className="muon-subtitle">with a personal touch</h2>
            <p className="muon-banner-txt">
              Muon Club is an invitation-only community where exceptional
              start-up founders connect directly with the decision makers and
              raise the capital they need.
            </p>
            <div className="text-center">
              <p className="mb-0 muon-founder-refer-instruction">
                Do you know someone at Muon club? Ask them to refer you.
              </p>
            </div>
          </div>
        </article>
        <article className="col-md-3 muon-investors-right mt-2">
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

      {/* investor list */}
      {auth.isSignedIn && (
        <section className="muon-people">
          <div className="muon-people-intro">
            <h3>Explore start-up founders in 25 industries</h3>
            <p className="muon-work-intro-txt">
              Access start-up investment opportunities by connecting directly
              with the founders.
            </p>
          </div>

          <section className="muon-people-grid">
            {foundersList?.slice(0, inView)?.map((founder, i) => (
              <div key={founder?.name + founder?.label + i}>
                <PersonCard person={founder} />
              </div>
            ))}
          </section>

          {initialView < founders?.length && (
            <section className="text-center mb-5">
              {inView >= founders.length ? (
                <MuonButton
                  content="View less"
                  className="muon-more-people-btn"
                  onClick={viewLess}
                />
              ) : (
                <MuonButton
                  content="View more"
                  className="muon-more-people-btn"
                  onClick={viewMore}
                />
              )}{" "}
            </section>
          )}
        </section>
      )}
      {/*End of investor list */}

      {/* How it works */}
      <section className="muon-how">
        <div className="muon-people-intro">
          <h3>How it works</h3>
        </div>

        <section className="muon-how-grid-1">
          <article>
            <div className="d-flex align-items-start">
              <picture>
                <source media="(min-width:767px)" srcset={signUpIcon} />
                <source media="(min-width:360px)" srcset={signUpIconSm} />
                <img src={signUpIconSm} alt="register" />
              </picture>
              <div className="muon-how-content-1">
                <p className="muon-how-header">Sign up</p>
                <p className="muon-how-txt">
                  Register and answer a few questions{" "}
                </p>
              </div>
            </div>
          </article>

          <article>
            <div className="d-flex align-items-start">
              <picture>
                <source media="(min-width:767px)" srcset={findIcon} />
                <source media="(min-width:360px)" srcset={findIconSm} />
                <img src={findIconSm} alt="find your match" />
              </picture>
              <div className="muon-how-content-1">
                <p className="muon-how-header">Find your match</p>
                <p className="muon-how-txt">
                  We will match you with the investors who are looking for
                  someone like you.
                </p>
              </div>
            </div>
          </article>

          <article>
            <div className="d-flex align-items-start">
              <picture>
                <source media="(min-width:767px)" srcset={chatIcon} />
                <source media="(min-width:360px)" srcset={chatIconSm} />
                <img src={chatIconSm} alt="Have a chat" />
              </picture>
              <div className="muon-how-content-1">
                <p className="muon-how-header">Have a chat</p>
                <p className="muon-how-txt">
                  Set up a call and get to know your potential investor.
                </p>
              </div>
            </div>
          </article>

          <article>
            <div className="d-flex align-items-start">
              <picture>
                <source media="(min-width:767px)" srcset={investIcon} />
                <source media="(min-width:360px)" srcset={investIconSm} />
                <img src={investIconSm} alt="Take a trip & Invest" />
              </picture>
              <div className="muon-how-content-1">
                <p className="muon-how-header">Sign the deal</p>
                <p className="muon-how-txt">
                  Get the money to boost your start-up's growth.
                </p>
              </div>
            </div>
          </article>
        </section>
        <section
          className="text-center position-relative"
          style={{ bottom: "-50px" }}
        >
          {/* <MuonButton
            content="Join Muon Club"
            onClick={() => {
              history.push("/founder/becomeMember");
            }}
          /> */}
          {/* <p className="muon-terms">
            By proceeding further, you agree to our{" "}
            <span className="muon-terms-link" onClick={openTerms}>
              Terms & Conditions
            </span>
          </p> */}
        </section>
      </section>
      {/*End of How it works */}

      {/*what muon gives*/}
      <section className="muon-what">
        <h3>
          What <b>Muon club</b> membership gives you
        </h3>
        <section className="d-flex muon-flex" style={{ overflowX: "auto" }}>
          <div className="muon-what-item" style={{ width: 260 }}>
            <img src={ConnectWithInvestor} alt="connect" />
            <h6>Connect with investors</h6>
            <p>
              Connect with your potential investors in a convenient,
              personalized setting.
            </p>
          </div>

          {/* <div className="muon-what-item">
            <img src={vr} alt="connect" />
            <h6>VR technology</h6>
            <p>
              Speed up the fundraising process by leveraging VR capabilities.
            </p>
          </div> */}

          <div className="muon-what-item" style={{ width: 260 }}>
            <img src={exposure} alt="connect" />
            <h6>Increase exposure</h6>
            <p>Gain more visibility by publishing articles in our blog.</p>
          </div>

          <div className="muon-what-item" style={{ width: 260 }}>
            <img src={likeMinds} alt="connect" />
            <h6>Join like-minded founders</h6>
            <p>
              Become a part of the network of like-minded start-up founders and
              share ideas freely.
            </p>
          </div>

          <div className="muon-what-item" style={{ width: 260 }}>
            <img src={referral} alt="connect" />
            <h6>Refer and reap benefits</h6>
            <p>
              Refer a trusted start-up founder and receive a bonus once they
              have joined the community.
            </p>
          </div>

          {/* <div className="muon-what-item">
            <img src={travelImg} alt="connect" />
            <h6>Travel</h6>
            <p>
              Go on luxury getaways with your founders. Santa brings you
              presents once a year, with Muon.club you can turn your entire year
              into one Christmas vacation.
            </p>
          </div> */}

          {/* <div className="muon-what-item">
            <img src={investImg} alt="connect" />
            <h6>Invest</h6>
            <p>
              Invest in the best start-ups while sipping a cocktail in the
              Maldives.
            </p>
          </div> */}
        </section>
      </section>
      {/*End what muon gives*/}

      {/* benefit */}
      <section className="muon-how">
        <div className="muon-people-intro">
          <h3>Your benefits</h3>
        </div>

        <section className="muon-how-grid-1">
          <article>
            <div className="d-flex align-items-start">
              <picture>
                <source media="(min-width:767px)" srcset={databaseIcon} />
                <source media="(min-width:360px)" srcset={databaseIconSm} />
                <img src={databaseIconSm} alt="large database" />
              </picture>
              <div className="muon-how-content-1">
                <p className="muon-how-header">Large Database</p>
                <p className="muon-how-txt">
                  The largest database of investors who are ready to meet you.
                </p>
              </div>
            </div>
          </article>

          <article>
            <div className="d-flex align-items-start">
              <picture>
                <source media="(min-width:767px)" srcset={unlimitedIcon} />
                <source media="(min-width:360px)" srcset={unlimitedIconSm} />
                <img src={unlimitedIconSm} alt="Extensive Network" />
              </picture>
              <div className="muon-how-content-1">
                <p className="muon-how-header">Unlimited Opportunities</p>
                <p className="muon-how-txt">
                  Unlimited opportunity for exposure and growth.
                </p>
              </div>
            </div>
          </article>

          <article>
            <div className="d-flex align-items-start">
              <picture>
                <source media="(min-width:767px)" srcset={benefitsIcon} />
                <source media="(min-width:360px)" srcset={benefitsIconSm} />
                <img src={benefitsIconSm} alt="Automatic Booking" />
              </picture>
              <div className="muon-how-content-1">
                <p className="muon-how-header">Discounts & Benefits</p>
                <p className="muon-how-txt">
                  An extensive system of discounts and travel benefits.
                </p>
              </div>
            </div>
          </article>

          <article>
            <div className="d-flex align-items-start">
              <picture>
                <source media="(min-width:767px)" srcset={referralsIcon} />
                <source media="(min-width:360px)" srcset={referralsIconSm} />
                <img src={referralsIconSm} alt="discounts" />
              </picture>
              <div className="muon-how-content-1">
                <p className="muon-how-header">Referrals</p>
                <p className="muon-how-txt">Advanced referral program.</p>
              </div>
            </div>
          </article>
        </section>
      </section>
      {/* end of benefits */}

      {/* Our plans */}

      {/* <section className="muon-plan">
        <div className="muon-people-intro">
          <h3>Our plans</h3>
          <p className="muon-work-intro-txt">
            Get to contact 20 new investors/day and receive special offers and
            discounts for our exclusive invitation-only events.
          </p>
        </div>

        <section className="muon-plan-grid">
          <div className="muon-plan-card white-card d-flex flex-column justify-content-between align-items-center">
            <div className="text-center">
              <p className="muon-plan-duration">1 month plan</p>
              <h3 className="muon-plan-rate">$12/month</h3>
              <p className="muon-plan-value">Contact 600 new investors</p>
            </div>

            <button className="muon-choose-btn">
              <p>Choose</p>
            </button>
          </div>

          <div className="muon-plan-card value-card d-flex flex-column justify-content-between align-items-center">
            <section className="value-added">
              <div>Value Added</div>
            </section>
            <div className="text-center">
              <p className="muon-value-duration">4 months plan</p>
              <h3 className="muon-value-rate">$27/month</h3>
              <p className="muon-value">Contact 2,400 new investors (600*4)</p>
            </div>

            <button className="muon-choose-btn">
              <p>Choose</p>
            </button>
          </div>

          <div className="muon-plan-card white-card d-flex flex-column justify-content-between align-items-center">
            <div className="text-center">
              <p className="muon-plan-duration">12 months plan</p>
              <h3 className="muon-plan-rate">$58/month</h3>
              <p className="muon-plan-value">Contact 7,200 new investors</p>
            </div>

            <button className="muon-choose-btn">
              <p>Choose</p>
            </button>
          </div>
        </section>
      </section> */}
      {/* End of Our plans */}

      {/* how to become a member */}
      {/* <section className="row mx-0 muon-member-sec">
        <div className="col-md-7 d-flex align-items-center">
          <section className="muon-membership">
            <h2>How do I become a member?</h2>
            <p>
              Muon.club is an invitation-only community where exceptional
              start-up founders connect directly with the decision makers
              through exclusive tailored events and raise the capital they need.
            </p>
            <p>Do you know someone at Muon.club? Ask them to refer you.</p>
          </section>
        </div>

        <div className="col-md-5 d-flex align-items-center muon-refer-space">
          <section>
            <div className="text-center">
              <button className="muon-choose-btn " onClick={()=>{history.push('/referfounder')}}>
                <p>Refer a start-up</p>
              </button>

              <p className="muon-refer-txt">
                Refer a startup and claim your 5% discount <br />
                for upcoming events
              </p>
            </div>
          </section>
        </div>
      </section> */}

      {/* Muon quote from Tim cook */}
      {/* <section className="muon-quote d-flex align-items-center ">
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
        <Faq data={founder} />
      </section>
    </div>
  );
};

export { FounderHome };
