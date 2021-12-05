import React, { useEffect, useState } from 'react';
import arrowUp from '../../assets/images/arrowhead_up.svg';
import arrowDown from '../../assets/images/arrowhead-down.svg';
import arrowBack from '../../assets/images/arrow-forward.svg';
import removeIcon from '../../assets/images/removeIcon.svg';
import './chatBox.css';
import person from '../../assets/images/avatarHolder.webp';
import { API_PATH } from '../../utils/constants';
import { removeParticipant } from '../../queries/messageTab';
import { getChatParticipants } from '../../queries/chatBox';
import useMessagesQuery from '../../queries/messageTab';

const Participant = ({
  chatWith,
  setCurrentStep,
  open,
  setOpen,
  conversations,
  setConversations,
}) => {
  const [participants, setParticipants] = useState([]);
  const [createdBy, setCreatedBy] = useState(null);
  const [selected, setSelected] = useState(null);
  const {
    data,
    isError: isDataError,
    error: dataError,
    isLoading: isDataLoading,
  } = useMessagesQuery('messages');

  useEffect(() => {
    setConversations(data);
  }, [conversations]);

  const getParticipants = async () => {
    let res = await getChatParticipants(chatWith?.id);
    setCreatedBy(res?.createdBy);
    res = res?.participants?.filter(
      (r) => r?._id !== localStorage.getItem('id')
    );
    setParticipants([...res]);
    return;
  };

  useEffect(() => {
    getParticipants();
  }, []);

  // useEffect(() => {
  // setParticipants(
  //   conversations
  //     ?.find((conv) => conv._id === chatWith?.id)
  //     ?.participants?.filter((p) => p._id !== localStorage.getItem('id'))
  // );
  // setCreatedBy(
  //   conversations?.find((conv) => conv._id === chatWith?.id)?.createdBy
  // );
  // }, []);

  const addPlaceholder = (e) => {
    e.target.src = person;
  };

  const participantRemoval = async () => {
    const res = await removeParticipant(chatWith.id, selected);
    setParticipants(
      res?.participants?.filter((p) => p._id !== localStorage.getItem('id'))
    );
  };

  return (
    <div
      className={`muon-message-tab ${
        open ? 'muon-message-open' : 'muon-message-close'
      }`}
    >
      <section className="muon-message-header d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img
            src={arrowBack}
            alt="arrow back"
            className="chat-back"
            role="button"
            onClick={() => {
              setCurrentStep(2);
            }}
          />
          <p
            className="mb-0 muon-message-title text-black"
            style={{ opacity: 1 }}
          >
            {Array.isArray(chatWith?.name)
              ? `${chatWith?.name[0]}, ${chatWith?.name[1]}${
                  chatWith?.name.length > 2 ? ',...' : ''
                }` ?? ''
              : chatWith.name}
          </p>
        </div>
        <div>
          {createdBy === localStorage.getItem('id') ? (
            <img
              src={removeIcon}
              alt="Remove participant"
              role="button"
              style={{ marginRight: 16 }}
              onClick={participantRemoval}
            />
          ) : (
            ''
          )}
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
      <section className="muon-messages" style={{ position: 'relative' }}>
        <div className="muon-chat-message" id="chat_content">
          {participants?.map((participant) => (
            <div className="d-flex align-items-center justify-content-between muon-founder-to-add">
              <section className="d-flex align-items-center">
                <img
                  src={`${API_PATH}/${participant?.profileImage}`}
                  alt="person dp"
                  className="image"
                  onError={addPlaceholder}
                />
                <p className="mb-0">{participant?.name}</p>
              </section>
              <div
                onClick={() => {
                  selected === participant?._id
                    ? setSelected(null)
                    : setSelected(participant?._id);
                }}
                className={`${
                  selected === participant?._id
                    ? 'muon-added-founders-radio'
                    : 'muon-add-founders-radio'
                }`}
                role="button"
              ></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Participant;
