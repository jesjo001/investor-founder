import React from "react";
import back from "../../assets/images/questionnaireBackArrow.svg";
import useUserInfoQuery from "../../queries/userInfo";
import { API_PATH } from "../../utils/constants";
import cardVec1 from "../../assets/images/profileCardVec1.svg";
import cardVec2 from "../../assets/images/profileCardVec2.svg";
import "./investorProfilePage.css";
import { useHistory } from "react-router-dom";

export const InvestorProfilePage = () => {
  const history = useHistory();
  const { data, isError, isLoading } = useUserInfoQuery("me");
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error</p>;
  }
  return (
    <div className="muon-profile-pg">
      <section className="mb-5">
        <img
          src={back}
          alt="back"
          onClick={(e) => {
            e.preventDefault();
            history.push("/investor/dashboard");
          }}
        />
      </section>

      <section className="row mx-0 pb-5">
        <div className="pl-lg-0 col-lg-6">
          <section
            className="muon-profile-overlay d-flex align-items-end"
            // style={{
            //   background: `linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%), url('${API_PATH}/${data?.profileImage.replace(
            //     "\\",
            //     "/"
            //   )}')`,
            // }}
            style={{
              background: `linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%), url('${data.profileImage}')`,
            }}
          >
            <div className="muon-name-title-profile">
              <h3 className="muon-profile-name">{data?.name}</h3>
              <p className="muon-profile-title">{data?.type}</p>
            </div>
          </section>
        </div>
        <div className="pr-lg-0 col-lg-6">
          <h3 className="muon-profile-about">About :</h3>
          <h4 className="muon-investor-profile-subtitle py-2">
            Expertise : <p className="muon-inline">{data?.expertise}</p>
          </h4>
          <p className="mb-0 muon-profile-content">{data?.personal}</p>
        </div>
      </section>

      <section className="row mx-0 more-profile-data-card">
        <img src={cardVec1} alt="vector" className="profile-card-vec1" />
        <img src={cardVec2} alt="vector" className="profile-card-vec2" />
        <div className="pl-lg-6 col-lg-6">
          <h4 className="muon-investor-profile-subtitle">
            Startup: <p className="muon-inline">{data?.investedIn}</p>
          </h4>
        </div>

        <div className="pl-lg-6 col-lg-6">
          <h4 className="muon-investor-profile-subtitle">
            Ticket size : <p className="muon-inline">{data?.ticketSize}</p>
          </h4>
        </div>
        <div className="pl-lg-6 col-lg-6">
          <h4 className="muon-investor-profile-subtitle">
            Industries: <p className="muon-inline">{data?.industryType}</p>
          </h4>
        </div>

        <div className="pl-lg-6 col-lg-6 more-5">
          <h4 className="muon-investor-profile-subtitle">
            Stage : <p className="muon-inline">{data?.stage}</p>
          </h4>
        </div>
        <div className="pl-lg-6 col-lg-6 more-5">
          <h4 className="muon-investor-profile-subtitle">
            Locations : <p className="muon-inline">{data?.industryLocation}</p>
          </h4>
        </div>
      </section>
    </div>
  );
};
