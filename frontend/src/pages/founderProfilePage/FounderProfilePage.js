import React from "react";
import "./founderProfilePage.css";
import back from "../../assets/images/questionnaireBackArrow.svg";
import { MuonButton } from "../../components/index";
import moment from "moment";
import useUserInfoQuery from "../../queries/userInfo";
import { API_PATH } from "../../utils/constants";
import cardVec1 from "../../assets/images/profileCardVec1.svg";
import cardVec2 from "../../assets/images/profileCardVec2.svg";
import { date_frame } from "../../components/subcomponent/dateframe";

export const FounderProfilePage = () => {
  const { data, isError, isLoading } = useUserInfoQuery("me");
  if (isError) {
    return <p>Errored</p>;
  }
  if (isLoading) {
    return <p>Loading</p>;
  }
  return (
    <div className="muon-profile-pg">
      <section className="mb-5">
        <img src={back} alt="back" />
      </section>

      <section className="row mx-0">
        <div className="pl-lg-0 col-lg-6">
          <section
            className="muon-profile-overlay d-flex align-items-end"
            style={{
              background: `linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%), url('${data.profileImage}')`,
            }}
          >
            <div className="muon-name-title-profile">
              <h3 className="muon-profile-name">{data?.name}</h3>
              <p className="muon-profile-title">
                CEO &amp; Co-Founder at {data?.startupName}
              </p>
            </div>
          </section>
        </div>
        {/* <div className="pr-lg-0 col-lg-6">
          <h3 className="muon-profile-name">{data?.name}</h3>
          <p className="muon-profile-title">
            CEO &amp; Co-Founder at {data?.startupName}
          </p>
          
          <p className="mb-0 muon-profile-content">{data?.coolInfo}</p>

          <h4 className="muon-profile-about-startup">About the startup</h4>
        <span className="muon-person-label" style={{ display: "inline-block" }}>
          <p className="mb-0">{data?.industryType}</p>
        </span>
        <p className="muon-profile-about-txt">{data?.coolInfo}</p>
        </div> */}
      </section>

      {/* <section className="mt-4">
        <h4 className="muon-profile-about-startup">About the startup</h4>
        <span className="muon-person-label" style={{ display: "inline-block" }}>
          <p className="mb-0">{data?.industryType}</p>
        </span>
        <p className="muon-profile-about-txt">{data?.coolInfo}</p>
      </section> */}

      {/* <section className="mt-5">
        <h4 className="muon-profile-subtitle">Co-Founder names :</h4>

        <div className="muon-profile-co_founders">
          {co_founders.map((founder, i) => {
            return (
              <section
                className="d-flex align-items-center border-bottom py-3"
                key={i}
              >
                <img src={user} alt="user" className="user-profile-founders" />
                <div>
                  <p className="co_founder-name-p">Founder Name</p>
                  <p className="mb-0 co_founder-desc">
                    Building my own money remittance platform that features
                    lower rates and flexible solutions for...
                  </p>
                </div>
              </section>
            );
          })}
        </div>
      </section> */}

      {/* <section className="mt-5">
        <h4 className="muon-profile-subtitle">
          Money want to rise : {data?.ticketToRaise}
        </h4>
      </section> */}

      <section className="row mx-0 more-profile-data-card">
        <img src={cardVec1} alt="vector" className="profile-card-vec1" />
        <img src={cardVec2} alt="vector" className="profile-card-vec2" />
        <div className="pl-lg-6 col-lg-6">
          <h4 className="muon-investor-profile-subtitle">
            Industry: <p className="muon-inline">{data?.industryType ?? ""}</p>
          </h4>
        </div>

        <div className="pl-lg-6 col-lg-6">
          <h4 className="muon-investor-profile-subtitle">
          Year established: <p className="muon-inline">{data?.established ? moment(data?.established).format("MMM-YYYY") : ""}</p>
          </h4>
        </div>
        <div className="pl-lg-6 col-lg-6">
          <h4 className="muon-investor-profile-subtitle">
            Stage: <p className="muon-inline">{data?.stage ?? ""}</p>
          </h4>
        </div>

        <div className="pl-lg-6 col-lg-6 more-5">
          <h4 className="muon-investor-profile-subtitle">
            Money raised:{" "}
            <p className="muon-inline">{data?.ticketSize ?? ""}</p>
          </h4>
        </div>
        <div className="pl-lg-6 col-lg-6 more-5">
          <h4 className="muon-investor-profile-subtitle">
            Need to rise : {data?.ticketToRaise ?? ""}
          </h4>
        </div>
      </section>

      <section className="mt-5 mb-4 text-center">
        <a href={data?.deckLink}>
          <MuonButton content="View pitch deck" />
        </a>
      </section>
    </div>
  );
};
