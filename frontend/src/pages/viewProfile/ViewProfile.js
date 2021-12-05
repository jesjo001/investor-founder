import React, { useEffect,useState} from "react";
import { useHistory } from "react-router";
import { API_PATH } from "../../utils/constants";
import cardVec1 from "../../assets/images/profileCardVec1.svg";
import cardVec2 from "../../assets/images/profileCardVec2.svg";
import back from "../../assets/images/questionnaireBackArrow.svg";
import axios from "axios";
import { socket } from "../../App";

export const ViewProfile = ({match}) => {
   const [state, setstate] = useState([])
  useEffect(()=>{
    socket.emit('newUser', localStorage.getItem('id'));
    getUserDetails()

    if(localStorage.getItem("id") === match.params.id){
      return null
    }
    
    socket.emit('PROFILE_NOTIFICATION',localStorage.getItem("id"), match.params.id)
  },[])

  //Fetch The Details of the userID Passed
  async function getUserDetails(){
    
    const fetchData = await axios.get(`${API_PATH}/getUser/${match.params.id}`,
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    )
    return setstate(fetchData.data)
  }
  return <InvestorType userData={state}/>;
};

const InvestorType = ({userData}) => {
  const history = useHistory();

  console.log(userData)
  const picLink = () => {
    if (userData.profileImage && typeof(userData.profileImage) == 'string') return userData.profileImage.replace("\\", "/")
    else return ''
  }

  let data = {};
  return (
    <div className="muon-profile-pg">
      <section className="mb-5">
        <img
          src={back}
          alt="back"
          onClick={(e) => {
            e.preventDefault();
            history.goBack();
          }}
        />
      </section>

      <section className="row mx-0 pb-5">
        <div className="pl-lg-0 col-lg-6">
          <section
            className="muon-profile-overlay d-flex align-items-end"
            style={{
              background: `linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%), url('${API_PATH}/${picLink()}')`,
            }}
          >
            <div className="muon-name-title-profile">
              <h3 className="muon-profile-name">{data?.name ?? `Name: ${userData.name}`}</h3>
              <p className="muon-profile-title">{data?.type ?? `Email: ${userData.email}`}</p>
            </div>
          </section>
        </div>
        <div className="pr-lg-0 col-lg-6">
          <h3 className="muon-profile-about">About :</h3>
          <h4 className="muon-investor-profile-subtitle py-2">
            Expertise :{``}
            <p className="muon-inline">{data?.expertise ??  `${userData.expertise}`}</p>
          </h4>
          <p className="mb-0 muon-profile-content">
            {userData.coolInfo ? `${userData.coolInfo}` : `${userData.personal}`}
          </p>
        </div>
      </section>

      <section className="row mx-0 more-profile-data-card">
        <img src={cardVec1} alt="vector" className="profile-card-vec1" />
        <img src={cardVec2} alt="vector" className="profile-card-vec2" />
        <div className="pl-lg-6 col-lg-6">
          <h4 className="muon-investor-profile-subtitle">
           {userData.role == 'Investor' ? 'Invested In' : 'Startup'}
            <p className="muon-inline">{userData?.startupName ? `${userData.startupName}` : `${userData.investedIn}`}</p>
          </h4>
        </div>

        <div className="pl-lg-6 col-lg-6">
          <h4 className="muon-investor-profile-subtitle">
          {userData.role == 'Investor' ? 'Ticket size' : 'Ticket To Raise'}
            <p className="muon-inline">{userData?.ticketSize ? `${userData.ticketSize}` : `${userData.ticketToRaise}`}</p>
          </h4>
        </div>
        <div className="pl-lg-6 col-lg-6">
          <h4 className="muon-investor-profile-subtitle">
            Industries:{" "}
            <p className="muon-inline">
              {data?.industryType ?? `${userData.industryType}`}
            </p>
          </h4>
        </div>

        <div className="pl-lg-6 col-lg-6 more-5">
          <h4 className="muon-investor-profile-subtitle">
            Stage : <p className="muon-inline">{data?.stage ?? `${userData.stage}`}</p>
          </h4>
        </div>
        <div className="pl-lg-6 col-lg-6 more-5">
          <h4 className="muon-investor-profile-subtitle">
            Locations :{" "}
            <p className="muon-inline">
              {userData?.industryLocation ? `${userData.industryLocation}` : `${userData.officeAddress}`}
            </p>
          </h4>
        </div>
      </section>
    </div>
  );
};
