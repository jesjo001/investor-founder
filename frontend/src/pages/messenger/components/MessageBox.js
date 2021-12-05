import React, { useEffect, useState } from 'react';
import {
  MessengerHeader,
  ReceivedMessage,
  SentMessage,
  TimeStrip,
  MessengerInput,
  StartAChat,
} from './index';
import { getConversation, getMessages } from '../../../queries/messageTab';
import { getFounderPlan } from '../../../queries/founderList';
import { AddCoFounders } from '../../../components';
import { socket } from '../../../App';
import { useHistory } from 'react-router-dom';

export const MessageBox = ({
  startAChat,
  conversationId,
  setConversationId,
  initializing,
  setInitializing,
  setOpenAdd,
  openAdd,
  conversation,
  setConversation,
  loading,
  setLoading,
  messages,
  setMessages,
  currentChat,
  mutate,
  text,
  setText,
}) => {
  const [participants, setParticipants] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [userplan, setuserPlan] = useState(null);

  const userId = localStorage.getItem('id');
  const history = useHistory();

  const checkSubScription = async () => {
    if (localStorage.getItem('role') === 'Founder') {
      const plan = await getFounderPlan();
      return setuserPlan(plan?.data?.active);
    }
    return setuserPlan(true);
  };
  console.log(conversation);

  useEffect(() => {
    socket?.on('getChat', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
      });
    });
    checkSubScription();
  }, []);

  // console.log(userplan);

  useEffect(() => {
    arrivalMessage &&
      conversation?.participants?.some(
        (participant) => participant?._id === arrivalMessage.sender
      ) &&
      setMessages((pr) => [...pr, arrivalMessage]);
  }, [arrivalMessage, conversation]);

  // const getMsgs = async () => {
  //   setLoading(true);
  //   const res = await getMessages(conversationId || '');
  //   setMessages([...(res ?? [])]);
  //   setLoading(false);
  // };

  // const getOneConversation = async () => {
  //   let conversation = await getConversation(conversationId || '');
  //   setConversation(conversation);
  // };

  // useEffect(() => {
  //   getMsgs();
  //   getOneConversation();
  // }, [conversationId, initializing]);

  useEffect(() => {
    let chats = document.getElementById('message-box');
    if (chats) {
      chats.scrollTop = chats.scrollHeight;
    }
  }, [messages]);

  if (!userplan && conversationId) {
    // history.push('/pricing');
  }

  return (
    <div className="muon-message-box">
      <section className="position-relative w-100" style={{ zIndex: 10 }}>
        <section style={{ display: openAdd ? 'block' : 'none' }}>
          <AddCoFounders
            close={() => setOpenAdd(false)}
            currentChat={conversationId}
            currentConversation={conversation}
            conversationWith={conversation?.participants?.filter(
              (part) => part?._id !== userId
            )}
            height="146%"
            participants={participants}
            setParticipants={setParticipants}
            setInitConv={setInitializing}
          />
        </section>
      </section>
      {!startAChat ? (
        <MessengerHeader
          conversation={conversation}
          // currentChat={currentChat}
          setConversation={setConversation}
          setConversationId={setConversationId}
          setOpenAdd={setOpenAdd}
          openAdd={openAdd}
          setInitializing={setInitializing}
          initializing={initializing}
          setParticipants={setParticipants}
        />
      ) : (
        <div className="muon-message-box-header">New Message</div>
      )}
      {!startAChat ? (
        loading || initializing ? (
          <div
            className="muon-message-space d-flex align-items-center justify-content-center"
            style={{ opacity: 0.5 }}
          >
            Loading...
          </div>
        ) : messages.length > 0 ? (
          <section className="muon-message-space" id="message-box">
            {messages?.map((message) => {
              {
                /* <TimeStrip /> */
              }
              return (
                <div>
                  {message?.sender?._id === localStorage.getItem('id') ? (
                    <SentMessage message={message?.text || ''} />
                  ) : (
                    <ReceivedMessage message={message?.text || ''} />
                  )}
                </div>
              );
            })}
          </section>
        ) : (
          <div
            className="muon-message-space d-flex align-items-center justify-content-center"
            style={{ opacity: 0.5 }}
          >
            {conversationId?.length > 0 && loading === false
              ? 'No Chat Yet'
              // : 'Select a connection and start chatting'}
              : 'Select a connection or start a new chat to start chatting'}
              
          </div>
        )
      ) : (
        <StartAChat
          setInitializing={setInitializing}
          initializing={initializing}
          setConversationId={setConversationId}
        />
      )}
      <section>
        <MessengerInput
          conversationId={conversationId}
          conversation={conversation}
          currentChat={currentChat}
          mutate={mutate}
          text={text}
          setText={setText}
        />
      </section>
    </div>
  );
};
