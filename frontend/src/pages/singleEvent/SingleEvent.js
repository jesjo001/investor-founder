import React,{useState, useEffect,useContext} from "react";
import "./singleEvent.css";
import eventBanner from "../../assets/images/sampleSingleEvent.png";
import venueImage from "../../assets/images/sampleVenueImage.png";
import { MuonButton } from "../../components/index";
import backArrow from "../../assets/images/backwardCircleArrow.svg";
import forwardArrow from "../../assets/images/forwardCircleArrow.svg";
// import events from "../../eventData.json"
import { useHistory } from "react-router";
import axios from "axios";
import { API_PATH } from "../../utils/constants";
import { socket } from "../../App";
import { AlertContext } from "../../context/alert";
import { date_frame, time_ago } from "../../components/subcomponent/dateframe";
import {
  EmailShareButton,
  FacebookShareButton,
  FacebookShareCount,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton
} from "react-share";

const SingleEvent = ({match}) => {
  
const [event, setstate] = useState([])
const [user_registered, setUserAlreadyRegistered] = useState([])
  /**
   * Event will be fetch from database using event ID 
   * the site will be on a non render mode if the event is fetch then render
   * the component else show the page loading up.
   */
  useEffect(() => {
    getEventData()
  }, [event])

//GET EVENT DETAILS BASED ON ID
async function getEventData(){
  const fetchAll = await axios.get(`${API_PATH}/events/event/${match.params.id}`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
  if(fetchAll){
    if(fetchAll.data.guests.length > 0){
      fetchAll.data.guests.map((ele,i)=>{
        if(ele.userId === localStorage.getItem("id")){
          return setUserAlreadyRegistered(ele.userId);
        }
        
      })
    }
    
   return setstate(fetchAll.data)
  }
  
}

//END GET EVENT DETAILS BASED ON ID
  const guestList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // const [event, setEvent] = useState(events[0])

  const  {location} = useHistory();
  // const eventIndex = Number(location.pathname.split("/")[2]) - 1;

  // useEffect(()=>{
  //   setEvent(events[eventIndex])
  // },[eventIndex])


  const scrollToLeft = (elementId) => {
    let list = document.getElementById(elementId);
    list.scrollBy({
      top: 0,
      left: 320,
      behavior: "smooth",
    });
  };

  const scrollToRight = (elementId) => {
    let list = document.getElementById(elementId);
    list.scrollBy({
      top: 0,
      left: -320,
      behavior: "smooth",
    });
  };

  const { setOn, setAlertContent } = useContext(AlertContext);
  //query to join user to event
  const JoinEvent = async()=>{
    if(localStorage.getItem("role") === "Founder"){
       window.location.href = 'https://buy.stripe.com/test_5kAcOQgiTe4o6uA000'
       return null
    }
    const jointevent = await fetch(`${API_PATH}/events/join_event`,{
      method:"POST",
    headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body:JSON.stringify({
        eventID:match.params.id
      })
    })
    const res = await jointevent.json()
    if(res.message){
      setAlertContent({
        title: "success",
        message: res.message,
        success: true,

      });
      socket.emit('JOIN_EVENT',localStorage.getItem("id"),match.params.id)
      return setOn(true);
    }
    setAlertContent({
      title: "error!",
      message: res.error,
      success: true,
    });
    return setOn(true);
    
  }

  const shareUrl = String(window.location);
 
  return (
    <div className="muon-single-event">
     {
       event.length !== 0?
        <>
         <h4 className="mb-4">
        <span className="muon-crumbs">Events / </span>
        <span className="muon-crumbs active-crumb">Event {event?.name}</span>
      </h4>
      <section>
        <img src={event?.resource.image ?? eventBanner} alt="banner" className="muon-event-banner" />
      </section>

          <FacebookShareButton
            url={shareUrl}
            quote={event?.name}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>

            <FacebookShareCount url={String(window.location)} className="Demo__some-network__share-count">
              {count => count}
            </FacebookShareCount>
          <WhatsappShareButton title={event?.name} url={shareUrl}>
            <WhatsappIcon size={"2rem"} round />
          </WhatsappShareButton>
          <TwitterShareButton
            url={shareUrl}
            title={event?.name}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>



      <section className="pb-5">
        <h3 className="muon-single-event-header">About the event :</h3>
        <p className="muon-single-event-txt">
          {event?.desc}
        </p>
        <p className="muon-single-event-txt">
         Date from : {
            date_frame(event?.date.from)
          }
            &nbsp;- to: {
            date_frame(event?.date.to)
          }
        </p>
        <p className="muon-single-event-txt">
         time from : {
            time_ago(event?.date.from)
          }
            &nbsp;- to: {
            time_ago(event?.date.to)
          }
        </p>
              {
                user_registered !== localStorage.getItem("id")?
              <MuonButton
                content="Count me in"
                className="px-5"
                style={{ height: 54 }}
                onClick={JoinEvent}
              />
              :null
            }
            </section>

      <section className="pb-5">
        <h3 className="muon-single-event-header">About the Venue :</h3>
        <p className="muon-single-event-txt">

          {event?.address.state+", "+event?.address.venue}
        </p>
        <p className="muon-single-event-txt">
          {event?.availability}
        </p>
      </section>

      <section className="d-flex align-items-center muon-venues flex-wrap">
        <div className="muon-event-venue">
          <img src={venueImage} alt="venue" />
        </div>
        <div className="muon-event-venue">
          <img src={venueImage} alt="venue" />
        </div>
      </section>

      <section>
        <h3 className="muon-single-event-header">Event guests</h3>
        <p className="muon-single-event-txt" style={{ lineHeight: "150%" }}>
          Lorem Ipsum is simply dummy text of the printing and
          <br /> typesetting industry. Lorem Ipsum has{" "}
        </p>

        <section className="position-relative">
          <img
            src={backArrow}
            alt="back"
            className="back-guest"
            onClick={()=>scrollToRight("guest-list")}
          />
          <img
            src={forwardArrow}
            alt="forward"
            className="forward-guest"
            onClick={()=>scrollToLeft("guest-list")}
          />
          <div className="muon-guest-list" id="guest-list">
            {event.guests.map((guest, i) => {
              return (
                <div key={i}>
                  {
                    guest.role === 'Investor'?
                    <GuestCard id={guest.userId} guest={guest}/>
                    :null
                  }
                  
                </div>
              );
            })}
          </div>
        </section>
      </section>

      <section>
        <h3 className="muon-single-event-header">Event partners</h3>
        <p className="muon-single-event-txt" style={{ lineHeight: "150%" }}>
          Lorem Ipsum is simply dummy text of the printing and
          <br /> typesetting industry. Lorem Ipsum has{" "}
        </p>

        <section className="position-relative">
          <img
            src={backArrow}
            alt="back"
            className="back-guest"
            onClick={()=>scrollToRight("partner-list")}
          />
          <img
            src={forwardArrow}
            alt="forward"
            className="forward-guest"
            onClick={()=>scrollToLeft("partner-list")}
          />

          <div className="d-flex align-items-center muon-partner-list" id="partner-list" >
          {event.guests.map((guest, i) => {
              return (
                <div key={i}>
                  {
                    guest.role === 'Founder'?
                    <GuestCard id={guest.userId} guest={guest}/>
                    :null
                  }
                  
                </div>
              );
            })}
          </div>
        </section>
      </section>
        </>
       :event === 2?
       <p>
         Nothing found
       </p>
       :null
     }
    </div>
  );
};

export { SingleEvent };

const GuestCard = ({ id,guest }) => {
  const [userData,setUser] = useState([])
    useEffect(()=>{
        // create function to fetch user details using props passed
        async function getUser(){
            const fetchAll = await fetch(`${API_PATH}/getUser/${id}`,{
            headers:{authorization:`Bearer ${localStorage.getItem("token")}`}
        })
        const res = await fetchAll.json()
        setUser(res)
        }
        getUser()
    },[])
  return (
    <div className="muon-guest">
      <section className="d-flex align-items-center mb-3">
          <img src={`${API_PATH}/${userData?.profileImage}`} alt="guest" className="muon-guest-img" />
         
        <p className="muon-guest-name"><a href={`/profile/${id}`}>{guest?.guestName}</a></p>
      </section>
      <section>
        <p className="muon-guest-desc">
          Est facilis esse voluptatem tenetur facilis quos. Reprehenderit et
          dicta est et corrupti. Neque vel harum dicta et...
        </p>
      </section>
    </div>
  );
};

