import React, { useEffect, useState } from "react";
import {
  InvestorConnections,
  ProgressBar,
  CustomItem,
  InvestorSearch,
  InviteCard,
  SearchFilter,
  FeedBack,
} from "../../components/index";
import profileVec from "../../assets/images/profileCompletionBg.svg";
import cardVec1 from "../../assets/images/infoVec1.svg";
import cardVec2 from "../../assets/images/infoVec2.svg";
import "./investDashboard.css";
import { ChatSpace } from "../../components/chatSpace/ChatSpace";
import useStartupCountQuery from "../../queries/startupCount";
import useFoundersListQuery from "../../queries/founderList";
import useUserInfoQuery from "../../queries/userInfo";
import useMessagesQuery from "../../queries/messageTab";
import { axiosInterceptor } from "../../utils/auth";
import { openModal } from "../../utils/rest";

export const InvestorDashboard = ({ history }) => {
  const [progres, setprogres] = useState(0);
  axiosInterceptor();
  const { isLoading: a, isError, data } = useUserInfoQuery("me");
  const { data: startupcount, isLoading: b } =
    useStartupCountQuery("startupcount");
  const { data: foundersList, isLoading: c } =
    useFoundersListQuery("foundersList");
  const { data: connections, isLoading: d } = useMessagesQuery("messages");
  const [chatWith, setChatWith] = useState({
    id: "",
    name: "",
    _id: "",
  });
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = React.useState({
    industry: "",
    ticketSize: "",
  });

  useEffect(() => {
    openModal("feedBackModal");
  }, []);

  // set useState to check for data that has no value and set progress to the total numner of count
  //if value isn't found then the count should be set to 50 else 100
  useEffect(() => {
    if (data?.investedIn !== "" && data?.profileimg !== "") {
      setprogres(100);
    } else {
      setprogres(50);
    }
  }, []);
  if (a || b || c || d) {
    return (
      <div
        style={{ minHeight: "calc(100vh - 80px)" }}
        className="d-flex align-items-center justify-content-center"
      >
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    // console.log(JSON.stringify(error));
    // console.log(error.response.data);
    // console.log(error.response.status);
    return null;
  }
  return (
    <section className="muon-dashboard">
      <FeedBack />
      <div>
        <h2 className="muon-dashboard-title">Welcome back, {data?.name}!</h2>

        <section className="muon-profile-progress muon-profile-bg">
          <img src={profileVec} alt="vector" />
          <div>
            {/* <h5 className="muon-profile-progress-title">Profile completion</h5> */}
            {progres === 100 ? (
              <>
                <label className="muon-profile-progress-txt">
                  Your profile is 100% complete
                </label>
                <ProgressBar
                  currentLevel={100}
                  numberOfLevels={100}
                  theme="dark"
                />
              </>
            ) : (
              <>
                <label className="muon-profile-progress-txt">
                  Your profile is 50% complete
                </label>
                <ProgressBar
                  currentLevel={50}
                  numberOfLevels={100}
                  theme="light"
                />
              </>
            )}

            {/* <p className="muon-profile-progress-txt">
              Tell us more to start contacting investors.
            </p> */}
            <button
              className="muon-choose-btn"
              style={{ position: "relative", zIndex: 10 }}
              onClick={() => {
                history.push("/investor/profile");
              }}
            >
              {progres === 100 ? <p>Update</p> : <p>Complete now</p>}
            </button>
          </div>
          <div className="empty-div"></div>
        </section>

        <h2 className="muon-dashboard-title muon-profile-connect">
          Connect with founders and investors
        </h2>
        <p className="muon-profile-sub">search for founders and investors</p>
        <SearchFilter setFilters={setFilters} />
        <InvestorSearch filters={filters} />
        <InvestorConnections
          connections={connections}
          setChatWith={setChatWith}
          setOpen={setOpen}
          setStep={setStep}
        />
      </div>
      <div>
        <section className="muon-investor-cards">
          <div className="muon-info-card">
            <img src={cardVec1} className="muon-vec1" alt="vector" />
            <img src={cardVec2} className="muon-vec2" alt="vector" />
            <h4>{data?.industryType}</h4>
            <p>Industries</p>
          </div>

          <div className="muon-info-card">
            <img src={cardVec1} className="muon-vec1" alt="vector" />
            <img src={cardVec2} className="muon-vec2" alt="vector" />
            <h4>{data.ticketSize}</h4>
            <p>Ticket size</p>
          </div>

          <div className="muon-investor-card" style={{ gridArea: "three" }}>
            <img src={cardVec1} className="muon-vec1" alt="vector" />
            <img src={cardVec2} className="muon-vec2" alt="vector" />
            <p className="mb-0 mr-5">Start-ups</p>
            <h4 className="my-0">{startupcount}</h4>
          </div>
          <div style={{ gridArea: "four" }}>
            <InviteCard />
          </div>
        </section>

        <section className="muon-custom-list">
          <div className="d-flex align-items-center">
            <h4 className="muon-founders-title">
              Founders
              {/* Custom  lists */}
            </h4>
          </div>
        </section>
        {/* <input
          type="search"
          placeholder="Search list"
          className="muon-co-founder-search"
        /> */}

        <section className="muon-founders-wrapper">
          {foundersList?.map((item, i) => {
            return (
              <div key={`${item}${i}`}>
                <CustomItem
                  key={i}
                  id={item._id}
                  name={item?.name ?? "Founder"}
                  more={item.email}
                />
              </div>
            );
          })}
        </section>
        {/* <section className="text-center muon-custom-btn-wrap">
          <MuonButton content="Create a list" />
        </section> */}
      </div>
      <ChatSpace
        chatWith={chatWith}
        setChatWith={setChatWith}
        step={step}
        setStep={setStep}
        open={open}
        setOpen={setOpen}
      />
    </section>
  );
};
