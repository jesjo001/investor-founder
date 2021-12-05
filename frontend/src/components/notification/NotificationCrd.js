import React, { useEffect, useState,useContext } from "react";
import "./notification.css";
// import sampleAkhil from "../../assets/images/sampleAkhil.png";
// import sampleAkhil2 from "../../assets/images/sampleAkhil2.png";
// import clock from "../../assets/images/noticeClock.svg";
import more from "../../assets/images/moreIcon.svg";
import deleteIcon from "../../assets/images/deleteIcon.svg";
import mute from "../../assets/images/muteIcon.svg";
import turnOff from "../../assets/images/turnOffIcon.svg";
//ADDED CODE
import axios from 'axios';
import { API_PATH } from '../../utils/constants';
import User from './userData/user';
import { socket } from '../../App';
import Receiver from './userData/receiver';
import { AlertContext } from "../../context/alert";

export const NotificationCrd = () => {
  const [allNotification, setNotification] = useState([]);

  console.log("Notification")
  console.log(allNotification)
  useEffect(() => {
    //fetchAll notification from the database for the loged in user
    async function fetchData() {
      const fetchAll = await fetch(`${API_PATH}/Notification/`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const response = await fetchAll.json();
      setNotification(response);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const noticeCard = document.getElementById("notice-menu");
    noticeCard.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    //ADDED CODE
// send user id to socket when user is online

    socket.emit('newUser', localStorage.getItem('id'));

    //on InviteEvent socket
    // works if user is online
    socket.on("getInvite", async (data) => {
      if (data.isActive === true) {
        const gettheNotification = await fetch(
          `${API_PATH}/Notification/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
              eventType: data.eventType,
              eventLink: data.eventID,
              sender: data.senderID,
              isActive: data.isActive,
            }),
          }
        );
        const res = await gettheNotification.json();
        if (res) {
          const fetchAll = await fetch(`${API_PATH}/Notification/`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const response = await fetchAll.json();

          return setNotification(response);
        }
      } 
      //works for invite if user is offline
      else if(data.isActive === false){
        const gettheNotification = await fetch(
          `${API_PATH}/Notification/OfflineMail`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
              eventType: data.eventType,
              eventLink: data.eventID,
              receiverId: data.receiverId,
              isActive: data.isActive,
            }),
          }
        );
        const res = await gettheNotification.json();
        if (res) {
          const fetchAll = await fetch(`${API_PATH}/Notification/`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          const response = await fetchAll.json();
  
          return setNotification(response);
        }
      }
    });
    //End on InviteEvent socket
    
    //Send Notification to user if online, data like view profile and more
    // works if online
    socket.on('Send_mail_message', async (data) => {
      if (data.isActive === true) {
       
        if(data.eventType !== "PROFILE_NOTIFICATION" && data.eventType !== "CONNECT_USERS"){
          return console.log('not valid')
        }
        //insert notification to database emit to the user only to profile for now
        
        const gettheNotification = await fetch(
          `${API_PATH}/Notification/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
              sender: data.senderID,
              eventType: data.eventType,
              isActive: data.isActive,
            }),
          }
        );
        const res = await gettheNotification.json();
        if (res) {
          const fetchAll = await fetch(`${API_PATH}/Notification/`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const response = await fetchAll.json();

          return setNotification(response);
        }
      }

      //else if the user is offline insert notification to database and send to user mail
      // works if offline
      if (data.isActive === false) {
        const gettheNotification = await fetch(
          `${API_PATH}/Notification/OfflineMail`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              receiverId: data.receiverId,
              eventType: data.eventType,
              isActive: data.isActive,
            }),
          }
        );
        const res = await gettheNotification.json();

        return res;
      }
    });

    /**
     * this notification socket handles notifications for Joining event 
     * this notification works both ofline and online mode 
     * if the user is online emit notification and still sebd to their mail 
     * but it only works wen the user is online!
     */
    socket.on("join_event", async (data) => {
      //Insert Notification to user
      if (data.isActive === true) {
        const gettheNotification = await fetch(`${API_PATH}/Notification/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            eventType: data.eventType,
            isActive: data.isActive,
            eventId: data.eventID,
          }),
        });
        if (gettheNotification) {
          const fetchAll = await fetch(`${API_PATH}/Notification/`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const response = await fetchAll.json();

          return setNotification(response);
        }
      }
    })

    //END ADD CODE
  }, []);

  //Clear all notifications
  const clearAllNotification = async () => {
    try {
      const response = await axios.get(`${API_PATH}/Notification/Clear`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        socket.emit("ClearNotification", localStorage.getItem("id"));
        socket.on("ClearAll", async () => {
          return setNotification([]);
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  //END CLEAR NOTIFICATION

  return (
    <div
      className="muon-notification notice-menu border-0 dropdown-menu p-0"
      id="notice-menu"
    >
      <section className="d-flex justify-content-between align-items-center muon-previous-notice">
        <h5>Notifications</h5>
        <div
          style={{ cursor: "pointer", fontSize: 14, color: "gray" }}
          onClickCapture={clearAllNotification}
        >
          Clear All
        </div>
      </section>
      {/* holds and loop the recent notification passed throught the socket */}

      {allNotification.length > 0 ? (
        <>
          {allNotification
            ? allNotification.map((data, i) => {
              return data?.type === 'EVENT_INVITATION' ? (
                <div>
                  <JoinEventNotice key={i} data={data} />
                </div>
              ) : data?.type === 'PROFILE_NOTIFICATION' ? (
                <div>
                  <ViewedProfileNotice key={i} data={data} />
                </div>
              ) : data?.type === 'PRICE_PLAN_NOTIFICATION' ? (
                <div>
                  <JoinEventNotice key={i} data={data} />
                </div>
              ) : data?.type === 'EVENT_NOTIFICATION' ? (
                <div>
                  <JoinEventNotice key={i} data={data} />
                </div>
              ) : data?.type === 'BLOG_NOTIFICATION' ? (
                <div>
                  <JoinEventNotice key={i} data={data} />
                </div>
              ) : data?.type === 'PASSWORD_RESET' ? (
                <div>
                  <Password_reset key={i} data={data} />
                </div>
              ): data?.type === 'JOIN_EVENT' ? (
                <div>
                  <JoinEventNotice key={i} data={data} />
                </div>
              )
              :data?.type === 'CONNECT_USERS' ? (
                <div>
                  <ConnectNotice key={i} data={data} />
                </div>
              )
              : null;
            })
            : null}
        </>
      ) : (
        <p className="d-flex justify-content-between align-items-center muon-previous-notice">
          No Notification for now
        </p>
      )}
    </div>
  );
};


const ViewedProfileNotice = ({ data }) => {
  //MARK A NOTIFICATION AS READ WHEN A USER CLICKS ON IT
  const UpdateView = async (id) => {
    const UpdateNotificationView = await axios.get(
      `${API_PATH}/Notification/UpdateView/${id}`,
      {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    return UpdateNotificationView;
  };
  return (
    <div
      className="d-flex align-items-center justify-content-between w-100 muon-messaged-notice"
      style={{ background: `${data.view === 0 ? "#F6FAFE" : "white"}` }}
      onClickCapture={(e) => UpdateView(data._id)}
    >
      {data?.sender ? <User data={data} /> : null}
      

      <section
        className="d-flex align-items-center justify-content-end"
        style={{ flexBasis: "32%" }}
      >
        <More />
      </section>
    </div>
  );
};

const JoinEventNotice = ({ data }) => {
  //MARK A NOTIFICATION AS READ WHEN A USER CLICKS ON IT
  /**
   * the join event notify users to join an event when a new event is created 
   * the updateView updates the notification collection to let the user know that he has already viewed this notification
   * 
   */
  const UpdateView = async (id) => {
    const UpdateNotificationView = await axios.get(
      `${API_PATH}/Notification/UpdateView/${id}`,
      {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    return UpdateNotificationView;
  };

  return data ? (
    <div
      className="d-flex align-items-center w-100 muon-messaged-notice"
      style={{ background: `${data.view === 0 ? "#6c8ec4" : "white"}` }}
      onClickCapture={(e) => UpdateView(data._id)}
    >
      {data.sender ? <User data={data} /> : <Receiver data={data} />}
      <More />

      <section
        className="d-flex align-items-center justify-content-end"
        style={{ flexBasis: "42%" }}
      >
        <a href={`/event/${data.blogLink}`}>
          {" "}
          <button className="notice-primary-btn mr-2">view</button>
        </a>
      </section>
    </div>
  ) : null;
};

const Password_reset = ({ data }) => {
  //MARK A NOTIFICATION AS READ WHEN A USER CLICKS ON IT
  const UpdateView = async (id) => {
    const UpdateNotificationView = await axios.get(
      `${API_PATH}/Notification/UpdateView/${id}`,
      {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    return UpdateNotificationView;
  };
  return (
    <div
      className="d-flex align-items-center w-100 muon-messaged-notice"
      style={{ background: `${data.view === 0 ? "#6c8ec4" : "white"}` }}
      onClickCapture={(e) => UpdateView(data._id)}
    >
      {data.sender ? <User data={data} /> : null}
      <More />

      <section
        className="d-flex align-items-center justify-content-end"
        style={{ flexBasis: "42%" }}
      ></section>
    </div>
  );
};
const ConnectNotice = ({ data }) => {
  const { setOn, setAlertContent } = useContext(AlertContext);
  /**
   * THe connectNotice function gets the user id from whom the notification is comming from,
   * runs a query search from the database collection of connection check list of users who the loggedIn user
   * connected with if the the loggedin user has already conected the incoming id then dont set the connectback 
   * else if the incomming id is not in his list then show the connect back button that allows the user to connect back 
   * to the user receiving.
   */
  const [userConnected, setUserconnected] = useState([])

  useEffect(async () => {
   
  const result = await fetch(`${API_PATH}/myConnectionSender`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  const res = await result.json()
  
    if (res?.data) {
      res?.data.map((users, i) => {
        if (users?.receiver?.userId === data?.sender?.id) {
          return setUserconnected(users?.receiver?.userId)
        }
      })
    }
  }, []);


  //MARK A NOTIFICATION AS READ WHEN A USER CLICKS ON IT
  const UpdateView = async (id) => {
    const UpdateNotificationView = await axios.get(
      `${API_PATH}/Notification/UpdateView/${id}`,
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    return UpdateNotificationView;
  };
  /**
   * the connect back functions is same as the connect function it takes the parameters of the loggedin user and the
   * the user who just started the connection, send it using socket. 
   * But the button only shows if the user sending the connection is not 
   * already in the loggedin user connection list.
   */
  const connetc_back = () =>{
    setAlertContent({
      title: "sent",
      message: 'request was sent',
      success: true,
    });
    socket.emit('CONNECT_USERS',localStorage.getItem("id"), data?.sender?.id)
    return setOn(true);
  }
  return (
    <div
    className="d-flex align-items-center w-100 muon-messaged-notice"
    style={{ background: `${data.view === 0 ? '#6c8ec4' : 'white'}` }}
    onClickCapture={(e) => UpdateView(data._id)}
  >
    {data.sender ? <User data={data} /> : <Receiver  data={data}/>}
    <More />

    <section
      className="d-flex align-items-center justify-content-end"
      style={{ flexBasis: '42%' }}
    >
      {
        data?.sender?.id?
        userConnected !== data?.sender?.id?
          <button className="notice-primary-btn mr-2" onClickCapture={connetc_back}>connect back</button>
          :
          <button className="notice-primary-btn mr-2" >connected</button>
        :null
      }
        
      
    </section>
  </div>
  );
};

// const FollowNotice = ({ from = "Akhill", time = "Just now" }) => {
//   return (
//     <div
//       className="d-flex align-items-center w-100 muon-messaged-notice"
//       style={{ background: "white" }}
//     >
//       <section>
//         <img
//           src={sampleAkhil2}
//           alt="user"
//           className="muon-messaged-notice-img"
//         />
//       </section>
//       <section className="w-100">
//         <p className="mt-0 muon-main-content muon-notice-from">
//           {from} <span>started following you</span>
//         </p>
//         <div className="d-flex align-items-center justify-content-between">
//           <section className="d-flex align-items-center">
//             <img src={clock} alt="clock" />
//             <p className="my-0 muon-notify-time">{time}</p>
//           </section>
//           <More />
//         </div>
//       </section>
//     </div>
//   );
// };

// const GroupNotice = ({ from = "Akhill", time = "5min ago" }) => {
//   return (
//     <div
//       className="d-flex align-items-center w-100 muon-messaged-notice"
//       style={{ background: "white" }}
//     >
//       <section>
//         <img
//           src={sampleAkhil}
//           alt="user"
//           className="muon-messaged-notice-img"
//         />
//       </section>
//       <section className="w-100">
//         <p className="mt-0 muon-main-content muon-notice-from">
//           {from} <span>Publish an article in Group Name</span>
//         </p>
//         <div className="d-flex align-items-center justify-content-between">
//           <section className="d-flex align-items-center">
//             <img src={clock} alt="clock" />
//             <p className="my-0 muon-notify-time">{time}</p>
//           </section>
//           <More />
//         </div>
//       </section>
//     </div>
//   );
// };

const More = () => {
  const [dropMenu, setDropMenu] = useState(false);

  return (
    <section className="more-dropdown">
      <div
        role="button"
        className={`m-0 ${dropMenu && "more-icon"}`}
        id="more"
        onClick={() => setDropMenu(!dropMenu)}
      >
        <img src={more} alt="more" width="23" height="5" />
      </div>

      <div
        className="more-menu"
        style={{ display: dropMenu ? "block" : "none" }}
      >
        <section
          className="d-flex align-items-center more-menu-item"
          role="button"
        >
          <img src={deleteIcon} alt="delete" />
          <div>
            <h6 className="m-0">Delete</h6>
            <p className="mb-0">Delete this notification</p>
          </div>
        </section>

        <section
          className="d-flex align-items-center more-menu-item"
          role="button"
        >
          <img src={mute} alt="mute" />
          <div>
            <h6 className="m-0">Mute</h6>
            <p className="mb-0">Mute Akhil’s updates</p>
          </div>
        </section>

        <section
          className="d-flex align-items-center more-menu-item mb-0"
          role="button"
        >
          <img src={turnOff} alt="turnOff" />
          <div>
            <h6 className="m-0">Turn Off</h6>
            <p className="mb-0">Stop seeing notifications like this</p>
          </div>
        </section>
      </div>
    </section>
  );
};
