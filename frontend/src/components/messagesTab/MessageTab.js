import React, { useEffect } from "react";
import "./messageTab.css";
// import addMessageVec from "../../assets/images/addMessageVec.svg";
import arrowUp from "../../assets/images/arrowhead_up.svg";
import arrowDown from "../../assets/images/arrowhead-down.svg";
import person from "../../assets/images/avatarHolder.webp";
import { API_PATH } from "../../utils/constants";
import useMessagesQuery from "../../queries/messageTab";

export const MessageTab = ({
  setChatWith,
  setConversations,
  setCurrentStep,
  conversations,
  isLoading,
  isError,
  error,
  open,
  setOpen,
}) => {
  // const {
  //   data,
  //   isError: isDataError,
  //   error: dataError,
  //   isLoading: isDataLoading,
  // } = useMessagesQuery("messages");

  // useEffect(() => {
  //   setConversations(data);
  // }, [conversations]);

  if (isLoading) {
    return null;
  }
  if (isError) {
    console.error(error);
    return null;
  }

  return (
    <div
      className={`muon-message-tab ${
        open ? "muon-message-open" : "muon-message-close"
      }`}
    >
      <section
        className="muon-message-header d-flex align-items-center justify-content-between"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <p className="mb-0 muon-message-title">Messages</p>
        <div>
          {/* <img
            src={addMessageVec}
            alt="add message"
            role="button"
            style={{ marginRight: 16 }}
          /> */}
          <img
            src={open ? arrowDown : arrowUp}
            alt="arrow"
            role="button"
            onClick={() => {
              setOpen(!open);
            }}
          />
        </div>
      </section>
      <hr className="m-0 muon-message-header-line" />
      <section className="muon-messages">
        {conversations?.map((conversation, i) => {
          const currentUser = localStorage.getItem("email");
          const result = conversation?.participants.filter(
            (participant) => participant.email !== currentUser
          );
          return result.length > 1 ? (
            <div
              key={`${i}`}
              onClick={() => {
                setCurrentStep(2);
                setChatWith({
                  id: conversation._id,
                  name: result.map((res) => res.name),
                  _id: result.map((res) => res._id),
                });
              }}
            >
              <Messages
                name={
                  `${result[0]?.name}, ${result[1]?.name}${
                    result.length > 2 ? ",..." : ""
                  }` ?? ""
                }
                profile={result[0]?.profileImage ?? person}
              />
            </div>
          ) : (
            <div
              key={`${i}`}
              onClick={() => {
                setCurrentStep(2);
                setChatWith({
                  id: conversation?._id,
                  name: result[0]?.name,
                  _id: result[0]?._id,
                });
              }}
            >
              <Messages
                name={result[0]?.name ?? ""}
                profile={result[0]?.profileImage ?? person}
              />
            </div>
          );
        })}
      </section>
    </div>
  );
};

const Messages = ({
  name = "Investor Name",
  lastMessage = "Hey, thanks for connecting!",
  time = "May 26th",
  profile,
}) => {
  const addPlaceholder = (e) => {
    e.target.src = person;
  };
  return (
    <div className="d-flex align-items-center justify-content-between muon-message">
      <section className="d-flex align-items-center">
        <img
          src={`${API_PATH}/${profile}`}
          alt="person dp"
          className="muon-messenger-dp"
          onError={addPlaceholder}
        />
        <div>
          <p className="muon-messenger-name">{name}</p>
          {/* <p className="mb-0 muon-last-messenger">{lastMessage}</p> */}
        </div>
      </section>
      <section>
        {/* <p className="mb-0 muon-last-messenger">{time}</p> */}
      </section>
    </div>
  );
};
