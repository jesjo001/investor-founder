import React, { useState, useEffect } from 'react';
import addPerson from '../../assets/images/addPersonVec.svg';
import arrowUp from '../../assets/images/arrowhead_up.svg';
import arrowDown from '../../assets/images/arrowhead-down.svg';
import person from '../../assets/images/avatarHolder.webp';
import arrowBack from '../../assets/images/arrow-forward.svg';
import checkAdd from '../../assets/images/checkAdd.svg';
import './chatBox.css';
import { MuonButton } from '../muonButton/MuonButton';
import useChatQuery from '../../queries/chatBox';
import { useMutation, useQueryClient } from 'react-query';
import chatBoxMutation from '../../mutations/chatBox';
import { API_PATH } from '../../utils/constants';
import useMessagesQuery from '../../queries/messageTab';
import { getAllParticipants, getMessages } from '../../queries/messageTab';
import axios from 'axios';
import { socket } from '../../App';

export const ChatBox = ({
  goBack,
  chatWith,
  currentStep,
  setCurrentStep,
  open,
  setOpen,
  setInitConv,
}) => {
  const [text, setText] = useState('');
  const [openAdd, setOpenAdd] = useState(false);
  const queryClient = useQueryClient();
  const [participants, setParticipants] = useState([]);

  const [arrivalMessage, setArrivalMessage] = useState(null);

  const { data, isLoading } = useChatQuery(['messaging', chatWith.id]);

  const [messages, setMessages] = useState([]);

  const getParticipants = async () => {
    let res = await getAllParticipants();
    res = res?.filter(
      (r) => r?.participant?._id !== localStorage.getItem('id')
    );
    setParticipants([...(res ?? [])]);
  };

  console.log(chatWith);
  // const [msgs, setMsgs] = useState([]);

  // const getMsgs = async () => {
  //   let res = await getMessages(chatWith?.id);
  //   setMsgs([...res]);
  // };

  useEffect(() => {
    if (data) setMessages(data);
  }, [data]);

  const [user] = useState({
    _id: localStorage.getItem('id'),
  });

  useEffect(() => {
    socket?.on('getChat', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      chatWith?._id === arrivalMessage?.sender &&
      setMessages((pr) => [...pr, arrivalMessage]);
  }, [arrivalMessage, chatWith]);

  useEffect(() => {
    Array.isArray(chatWith?.name)
      ? socket?.emit('joinGroup', { user: user?._id, group: chatWith?.id })
      : socket?.emit('newUser', user._id);
    // socket?.on('getUsers', (users) => {});
  }, [user]);

  const { mutate } = useMutation(chatBoxMutation, {
    onError: (error) => {
      console.error(error.response.data);
      console.error(error.response.status);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['messaging', chatWith.id]);
      setText('');
    },
  });

  const handleSendChat = async (e) => {
    e.preventDefault();
    try {
      if(text){
        await mutate({
          text: text,
          id: chatWith.id,
        });
      }     
    } catch (err) {
      console.error(err);
    }
    Array.isArray(chatWith?.name)
      ? socket?.emit('sendChat', {
          senderId: user._id,
          receiverId: chatWith?.id,
          text,
          isGroup: true,
        })
      : socket?.emit('sendChat', {
          senderId: user._id,
          receiverId: chatWith._id,
          text,
          isGroup: false,
        });
    //Check if user is online else notify them
    socket?.emit('MESSAGE_REQUEST', user._id, chatWith._id);
  };

  useEffect(() => {
    let chats = document.getElementById('chat_content');
    if (chats) {
      chats.scrollTop = chats.scrollHeight;
    }
  });

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
              setCurrentStep(1);
            }}
          />
          <p
            className="mb-0 muon-message-title text-black"
            style={{ opacity: 1 }}
            onClick={() => {
              setCurrentStep(3);
            }}
          >
            {Array.isArray(chatWith?.name)
              ? `${chatWith?.name[0]}, ${chatWith?.name[1]}${
                  chatWith?.name.length > 2 ? ',...' : ''
                }` ?? ''
              : chatWith.name}
          </p>
        </div>
        <div>
          <img
            src={addPerson}
            alt="add person"
            role="button"
            style={{ marginRight: 16 }}
            onClick={() => {
              getParticipants();
              setOpenAdd(!openAdd);
            }}
          />
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
          {isLoading ? (
            'loading...'
          ) : messages?.length > 0 ? (
            messages?.map((message) => {
              const isSender =
                localStorage.getItem('id') === message.sender._id;
              return isSender === true ? (
                <SentMessage key={message._id} message={message.text} />
              ) : (
                <ReceivedMessage
                  key={message._id}
                  message={message.text}
                  profile={message.sender.profileImage}
                  by={Array.isArray(chatWith?.name) ? message.sender.name : ''}
                />
              );
            })
          ) : (
            <div className="text-center" style={{ color: 'gray' }}>
              No Chats yet
            </div>
          )}
        </div>
        <section className="muon-chat-input-bubble">
          <form
            className="muon-chat-inputs  d-flex align-items-center w-100"
            onSubmit={handleSendChat}
          >
            <input
              type="text"
              className="flex-grow-1"
              autoFocus
              placeholder="Type a message"
              id="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            {/* <img src={emoji} alt="emoji" role="button" /> */}
            {/* <img src={clip} alt="papper clip" role="button" /> */}
            <MuonButton
              content="Send"
              className="chat-send-btn"
              onClick={handleSendChat}
            />
          </form>
        </section>
      </section>
      <section style={{ display: openAdd ? 'block' : 'none' }}>
        <AddCoFounders
          close={() => setOpenAdd(false)}
          currentChat={chatWith.id}
          currentConversation={chatWith}
          conversationWith={chatWith._id}
          participants={participants}
          setParticipants={setParticipants}
          setInitConv={setInitConv}
          chatWith={chatWith}
        />
      </section>
    </div>
  );
};

const SentMessage = ({
  message = 'Ut minima pariatur. Sint exercitationem quis et.',
  time = '3:15 PM',
}) => {
  return (
    <div className="d-flex align-items-end flex-column muon-chat-bubble">
      <section className="muon-sent-message">{message}</section>
      <section className="d-flex justify-content-end align-items-center">
        {/* <img src={clock} alt="clock" /> */}
        {/* <p className="mb-0 muon-message-time">{time}</p> */}
      </section>
    </div>
  );
};

const ReceivedMessage = ({
  message = 'Ut minima pariatur. Sint exercitationem quis et.',
  time = '3:18 PM',
  profile,
  by,
}) => {
  const addPlaceholder = (e) => {
    e.target.src = person;
  };
  return (
    <div className="d-flex align-items-start muon-chat-bubble">
      <img
        src={`${API_PATH}/${profile}`}
        onError={addPlaceholder}
        alt="sender dp"
        className="muon-sender-dp"
      />
      <div className="d-flex flex-column align-items-start">
        <section className="muon-receive-message">{message}</section>
        <section className="d-flex justify-content-start align-items-center">
          {/* <img src={clock} alt="clock" /> */}
          {/* <p className="mb-0 muon-message-time">{time}</p> */}
          <p className="mb-0 muon-message-time">{by}</p>
        </section>
      </div>
    </div>
  );
};

export const AddCoFounders = ({
  close = () => {},
  currentChat = '',
  currentConversation = { currentConversation },
  conversationWith,
  height = '',
  participants,
  setParticipants,
  setInitConv,
  chatWith,
}) => {
  const { data } = useMessagesQuery('messages');
  const senderId = localStorage.getItem('id') ?? '';

  let currentParticipants = data?.filter((d) => d._id === currentChat) ?? [];

  currentParticipants = currentParticipants[0]?.participants?.filter(
    (c) => c._id !== senderId
  );

  const [addedParticipants, setAddedParticipants] = useState([senderId]);

  const addParticipantToChat = async () =>
    Array.isArray(currentConversation?._id) ||
    currentConversation?.participants?.length > 2
      ? await axios
          .post(
            `${API_PATH}/conversation/add-participants`,
            {
              conversationId: currentChat,
              participants: [...new Set(addedParticipants)],
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          )
          .then((res) => console.log(`res`, res))
          .catch((err) => console.log(`err`, err))
      : await axios
          .post(
            `${API_PATH}/conversation/group-chat`,
            {
              conversationId: currentChat,
              participants: [
                ...new Set(addedParticipants),
                conversationWith[0]?._id,
              ],
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          )
          .then((res) => console.log(`res`, res))
          .catch((err) => console.log(`err`, err));

  return (
    <div className="muon-add-founder">
      <div className="muon-add-overlay" onClick={close}></div>
      <div className="muon-add-main">
        <section className="d-flex justify-content-between align-items-center muon-add-header">
          <p
            className="mb-0 close"
            onClick={() => {
              setParticipants([]);
              setAddedParticipants([]);
              close();
            }}
            role="button"
          >
            x
          </p>
          <p className="mb-0 title">Add participants</p>
          <p
            className="mb-0 add"
            role="button"
            onClick={async () => {
              setParticipants([]);
              setAddedParticipants([]);
              close();
              setInitConv(true);
              await addParticipantToChat();
              setInitConv(false);
            }}
          >
            Add
          </p>
        </section>
        <section
          className="muon-co-founders-add"
          style={{ height: `${height}` }}
        >
          {!participants ? (
            <div>'Loading...'</div>
          ) : (
            participants?.map(({ participant }, i) => {
              return (
                <div key={'co-founder' + i}>
                  <CoFoundersToAdd
                    participant={participant}
                    setAddedParticipants={setAddedParticipants}
                    addedParticipants={addedParticipants}
                    participants={participants}
                  />
                </div>
              );
            })
          )}
        </section>
      </div>
    </div>
  );
};

export const CoFoundersToAdd = ({
  participant = { name: 'Co founder 1' },
  setAddedParticipants,
  addedParticipants,
  setCurrentStep,
  participants,
}) => {
  const [added, setAdded] = useState(false);
  const [pick, setPick] = useState(null);

  const addPlaceholder = (e) => {
    e.target.src = person;
  };

  useEffect(() => {}, [participants]);

  const addParticipant = (e) => {
    setAdded(!added);
    if (addedParticipants?.includes(participant?._id)) {
      setAddedParticipants((prev) =>
        prev?.filter((p) => p !== participant?._id)
      );
    } else {
      setAddedParticipants([...addedParticipants, participant?._id]);
    }
  };
  return (
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
        data-id={participant?._id}
        onClick={(e) => {
          addParticipant(e);
          // console.log(e.target.getAttribute('data-id'));
        }}
        className={`${
          added ? 'muon-added-founders-radio' : 'muon-add-founders-radio'
        }`}
        role="button"
      >
        {added && <img src={checkAdd} alt="check-add" />}
      </div>
    </div>
  );
};
