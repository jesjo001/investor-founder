import React, { useState,useEffect,useContext } from "react";
import eventsVec from "../../assets/images/eventVec.svg";
import sampleEvent from "../../assets/images/sampleEvent.png";
import pin from "../../assets/images/pin.svg";
import event from "../../assets/images/event.svg";
import calender from "../../assets/images/calendar.svg";
import avaliable from "../../assets/images/availablity.svg";
import drop from "../../assets/images/downdrop.svg";
import { MuonButton } from "../../components/index";
import searchIcon from "../../assets/images/searchIcon.svg";
import "./muonEvent.css";
import { date_frame } from "../../components/subcomponent/dateframe";
import { socket } from "../../App";
import useConnecionQuery from '../../queries/connectionreceiver'
import { AlertContext } from "../../context/alert";
// import events from "../../eventData.json"

export const MuonEvent = ({events}) => {
  
  // const events = [1, 2, 3, 4];
  const { data: ConnectionList, isLoading: c } =
  useConnecionQuery("myConnection");

const [myconnections, setmyconnections] = useState([]);
  
useEffect(() => {
  setmyconnections(ConnectionList);
}, [ConnectionList]);

  return (
    <div className="muon-events">
      <section className="muon-about-intro">
        <div className="muon-about-content">
          <section className="d-flex flex-column justify-content-center">
            <h2 className="muon-about-title">Muon events</h2>
            <p>
              We love to travel and explore new, uncharted territory! With Muon
              Club, you can travel around the world and build up a network of
              international investors who are ready to share their expertise and
              perspectives.
            </p>
            <p>
              Don’t miss out on a chance to attend our unique small-scale events
              in global locations. Explore our upcoming events and book your
              place now.
            </p>
          </section>
          <section className="d-flex flex-column justify-content-center">
            <img
              src={eventsVec}
              alt="about vector"
              className="muon-about-vec"
            />
          </section>
        </div>
      </section>

      <section className="muon-happening">
        <h4>Muon events happening near you</h4>
        <p>
          Get the chance to attend our unique small-scale events in global
          locations. Explore our upcoming events and book your place now.
        </p>
      </section>

      {/* Event Inputs  */}
      <section className="muon-event-inputs">
        <div className="muon-event-search d-flex align-items-center search">
          <img src={searchIcon} alt="search" />
          <input type="search" placeholder="Search" />
        </div>

        <div className="location">
          <EventDropdown icon={pin} title="Location" options={["Location"]} />
        </div>
        <div className="event">
          <EventDropdown
            icon={event}
            title="Event Type"
            options={["Event 1", "Event 2"]}
          />
        </div>
        <div className="date">
          <EventDropDate title="Date of the event" />
        </div>
        <div className="available">
          <EventDropdown
            icon={avaliable}
            title="Availability"
            options={["5 seats left"]}
          />
        </div>
      </section>
      {/* End Event Inputs */}

      <section className="muon-event-grid">
        {events.map((event, i) => {
          
          return (
            <div key={i}>
              <EventCard event={event} id={event._id} myconn={myconnections}/>
            </div>
          );
        })}
      </section>
      <section className="text-center py-4">
        <MuonButton content="View more" className="px-5" />
      </section>
    </div>
  );
};

const EventCard = ({event, id, myconn}) => {
  
  const { setOn, setAlertContent } = useContext(AlertContext);
  //send event invite to all users connected network.
  const ShareEvent = ()=>{
    socket.on('send_inivte',(message)=>{
      setAlertContent({
        title: "success",
        message: message,
        success: true,
  
      });
      return setOn(true);
    })
    myconn.data.length > 0?
    myconn.data.map((user,i)=>{
      return(
        socket.emit('EVENT_INVITATION',localStorage.getItem("id"),id,user.sender.userId)//Id=event id user.receiver.userId = the user receiving the invive
        //in this case multiple users since we are looping through the user connection list.
       
      )
    })
    :
    setAlertContent({
      title: "error",
      message: 'you can share invite to someone when they connect with you.',
      success: false,

    });
    return setOn(true);
  }
  
  return (
    <div className="muon-event-card">
      <section className="muon-even-thumb">
        <img src={event?.resource.image ?? sampleEvent} alt="event peek" />
      </section>
      <section>
        <div className="d-flex align-items-center muon-title-label">
          <p className="mb-0 muon-event-title">{event.name}</p>
          <span className="muon-person-label">
            <p className="mb-0">Brunch</p>
          </span>
        </div>
        <p className="muon-event-main-content">
          Investors are waiting for you at {event.address.venue} in {event.address.country} on {date_frame(event.date.from)}
        </p>
        <p className="muon-event-more-txt">
          {event.desc.slice(0,114)}...
        </p>
        <section className="text-left">
          <a className="muon-event-read" onClick={ShareEvent}>
            Share with network
          </a>
        </section>
        <section className="text-right">
          <a href={`/event/${id}`} className="muon-event-read">
            Register
          </a>
        </section>
      </section>
    </div>
  );
};

const EventDropdown = ({
  options = [],
  title = "title",
  icon = "",
}) => {
  const [content, setContent] = useState(options[0] ?? "Location 1");

  const handleClick = (value) => {
    setContent(value);
  };

  return (
    <div className="dropdown">
      <button
        className="muon-event-dropdown"
        type="button"
        id="dropdownMenu2"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center" style={{ columnGap: 13 }}>
            <img src={icon} alt={title} />
            <section>
              <p className="mb-0 muon muon-drop-title">{title}</p>
              <p className="mb-0 muon-event-drop-content">{content}</p>
            </section>
          </div>
          <img src={drop} alt="drop" />
        </div>
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
        {options?.length > 0 &&
          options.map((option, index) => {
            return (
              <button
                className="dropdown-item"
                onClick={() => handleClick(option)}
              >
                {option}
              </button>
            );
          })}
      </div>
    </div>
  );
};

const EventDropDate = ({
  title = "title",
  onSelect = () => {},
}) => {
  const [content, setContent] = useState("14-06-2021");

  const handleClick = (e) => {
    setContent(e.target.value);
    onSelect();
  };


  return (
    <button
      htmlFor="eventDate"
      className="muon-event-dropdown"
      style={{ position: "relative" }}
    >
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center" style={{ columnGap: 13 }}>
          <img src={calender} alt={title} />
          <section>
            <p className="mb-0 muon-drop-title">{title}</p>
            <p className="mb-0 muon-event-drop-content">{content}</p>
            <input
              type="date"
              className="muon-drop-date"
              id="eventDate"
              name="eventDate"
              onChange={handleClick}
            />
          </section>
        </div>
        <img src={drop} alt="drop" />
      </div>
    </button>
  );
};
