import React, { useState, useEffect } from 'react';
import {
  InvestorConnections,
  ProgressBar,
  CustomItem,
  InvestorSearch,
  InviteCard,
  SearchFilter,
} from '../../components/index';
import profileVec from '../../assets/images/profileCompletionBg.svg';
import cardVec1 from '../../assets/images/infoVec1.svg';
import cardVec2 from '../../assets/images/infoVec2.svg';
import './founderDashboard.css';
import moment from 'moment';
import { ChatSpace } from '../../components/chatSpace/ChatSpace';
import useInvestorsListQuery from '../../queries/investorList';
import useUserInfoQuery from '../../queries/userInfo';
import useMessagesQuery from '../../queries/messageTab';
import { date_frame } from '../../components/subcomponent/dateframe';
import { axiosInterceptor } from '../../utils/auth';

const FounderDashboard = ({ history }) => {
  const [progres, setprogres] = useState(0);
  axiosInterceptor();
  const { isLoading: a, isError, data } = useUserInfoQuery('me');
  const { data: investorsList, isLoading: b } =
    useInvestorsListQuery('investorsList');
  const { data: connections, isLoading: c } = useMessagesQuery('messages');
  const [chatWith, setChatWith] = useState({
    id: '',
    name: '',
    names: [],
    ids: [],
  });
  const [filters, setFilters] = React.useState({
    industry: '',
    ticketSize: '',
  });
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  // set useState to check for data that has no value and set progress to the total numner of count
  //if value isn't found then the count should be set to 50 else 100
  useEffect(() => {
    if (
      data?.established !== '' &&
      data?.officeAddress !== '' &&
      data?.expertise !== ''
    ) {
      setprogres(100);
    } else {
      setprogres(50);
    }
  }, []);

  if (a || b || c) {
    return <p>Is Loading</p>;
  }

  if (isError) {
    // console.log(JSON.stringify(error));
    // console.log(error.response.data);
    // console.log(error.response.status);
    return null;
  }

  return (
    <section className="muon-dashboard">
      <div>
        <h2 className="muon-dashboard-title">Welcome back, {data?.name}!</h2>

        <section className="muon-profile-progress muon-profile-bg">
          <img src={profileVec} alt="vector" />
          <div>
            <h5 className="muon-profile-progress-title">Profile completion</h5>
            <p className="muon-profile-progress-txt">
              Tell us more to start contacting investors.
            </p>
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
              style={{ position: 'relative', zIndex: 10 }}
              onClick={() => {
                history.push('/founder/profile');
              }}
            >
              {progres === 100 ? <p>Update</p> : <p>Complete now</p>}
            </button>
          </div>
          <div className="empty-div"></div>
        </section>

        <h2 className="muon-dashboard-title muon-profile-connect">
          Connect with investors
        </h2>
        <p className="muon-profile-sub">Find your investors in our database.</p>
        <SearchFilter setFilters={setFilters} filters={filters} />
        <InvestorSearch />
        <InvestorConnections
          connections={connections}
          setChatWith={setChatWith}
          setOpen={setOpen}
          setStep={setStep}
        />
      </div>
      <div>
        <section className="muon-info-cards">
          <div className="muon-info-card">
            <img src={cardVec1} className="muon-vec1" alt="vector" />
            <img src={cardVec2} className="muon-vec2" alt="vector" />
            <h4>{moment(data.established).format('MMM-YYYY')}</h4>
            <p>Established</p>
          </div>

          <div className="muon-info-card">
            <img src={cardVec1} className="muon-vec1" alt="vector" />
            <img src={cardVec2} className="muon-vec2" alt="vector" />
            <h4>{data.stage}</h4>
            <p>Current stage</p>
          </div>

          <div className="muon-info-card">
            <img src={cardVec1} className="muon-vec1" alt="vector" />
            <img src={cardVec2} className="muon-vec2" alt="vector" />
            <h4>0</h4>
            <p>Investors</p>
          </div>

          <div className="muon-info-card">
            <img src={cardVec1} className="muon-vec1" alt="vector" />
            <img src={cardVec2} className="muon-vec2" alt="vector" />
            <h4>{data?.ticketRaised}</h4>
            <p>Raised</p>
          </div>

          <div style={{ gridArea: 'four' }}>
            <InviteCard />
          </div>
        </section>

        <section className="muon-your-co-founders">
          {/* <div className="d-flex align-items-center muon-title-co-space">
            <h4 className="muon-founders-title">Your Co-Founders</h4>
            <div className="muon-founder-count">3</div>
          </div>
          <input
            type="search"
            placeholder="Search"
            className="muon-co-founder-search"
          />

          <section className="muon-founders-wrapper">
            {yourCoFounders.map((co_founder, i) => {
              return (
                <div key={`${co_founder}${i}`}>
                  <CoFounder />
                </div>
              );
            })}
          </section> */}

          <section className="muon-custom-list">
            <div className="d-flex align-items-center">
              <h4 className="muon-founders-title">Investors List</h4>
              {/* <label className="mb-0 d-flex align-items-center">
                <input type="radio" />
                Add watchlist to profile
              </label> */}
            </div>
          </section>
          {/* <input
            type="search"
            placeholder="Search list"
            className="muon-co-founder-search"
          /> */}

          <section className="muon-founders-wrapper">
            {investorsList.map((item, i) => {
              return (
                <div key={`${item}${i}`}>
                  <CustomItem
                    id={item._id}
                    name={item?.name ?? 'Investor'}
                    more={item.email}
                  />
                </div>
              );
            })}
          </section>
          {/* <section className="text-center muon-custom-btn-wrap">
            <MuonButton content="Create a list" />
          </section> */}
        </section>
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

export { FounderDashboard };
