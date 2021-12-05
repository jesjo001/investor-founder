import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
} from 'react-router-dom';
import { MuonButton } from '../../components/index';
import { MessageBox, MessengerConnects } from './components';
import { getConversation, getMessages } from '../../queries/messageTab';
import { socket } from '../../App';
import chatBoxMutation from '../../mutations/chatBox';
import './messenger.css';
import { useMutation, useQueryClient } from 'react-query';
import useChatQuery from '../../queries/chatBox';
import arrow from '../../assets/images/arrowhead-down.svg';
import { axiosInterceptor } from '../../utils/auth';

export const Messenger = () => {
  axiosInterceptor();
  const [startAChat, setStartAChat] = useState(false);
  const [activeConversation, setActiveConversation] = useState(false);
  const [id, setId] = useState(1);
  const [conversationId, setConversationId] = useState(null);
  const [initializing, setInitializing] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [conversation, setConversation] = useState({});
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [text, setText] = React.useState('');

  const [openMobSide, setOpenMobSide] = useState(false);

  const { data, isLoading } = useChatQuery(['messaging', conversationId]);

  let { messageId } = useParams();

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    if (data) setMessages(data);
    setLoading(false);
    if (messageId) {
      setConversationId(messageId);
    }
  }, [data, conversationId, messageId]);

  const queryClient = useQueryClient();

  const userId = localStorage.getItem('id');

  const { mutate } = useMutation(chatBoxMutation, {
    onError: (error) => {
      console.error(error.response.data);
      console.error(error.response.status);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([
        'messaging',
        conversationId ? conversationId : '',
      ]);
      setText('');
    },
  });

  const currentChat =
    conversation?.participants?.filter(
      (participant) => participant?._id !== userId
    )[0] || {};

  // const getMsgs = async () => {
  // setLoading(true);
  // const res = await getMessages(conversationId || '');
  // setMessages([...res]);
  // setLoading(false);
  // };

  const getOneConversation = async () => {
    let conversation = await getConversation(conversationId || '');
    setConversation(conversation);
  };

  useEffect(() => {
    // getMsgs();
    getOneConversation();
  }, [conversationId, initializing]);
  // const currentConversation = conversation;

  useEffect(() => {
    socket?.emit('newUser', userId);
    conversation?.participants?.length > 2
      ? socket?.emit('joinGroup', { user: userId, group: conversation?._id })
      : console.log(conversationId);
    socket?.on('getUsers', (users) => {
      setOnlineUsers(users);
    });
  }, [userId]);

  const title =
    conversation?.participants?.filter(
      (participant) => participant?._id !== localStorage.getItem('id')
    )[0]?.name || '';

  console.log(`title`, title);

  return (
    <div className="muon-messenger-layout">
      <div className="muon-mobile-title-messenger">
        <span
          className="muon-messenger-mobile"
          onClick={() => setOpenMobSide(!openMobSide)}
        >
          <img
            src={arrow}
            alt="arrow"
            className={`${openMobSide ? 'm-img' : 'n-img'}`}
            title="open connections"
          />
        </span>
        <span style={{ color: '#5b86e5' }}>{title}</span>
      </div>
      <section
        className="muon-side-connect"
        style={{ left: openMobSide ? 0 : '-100%' }}
      >
        <MessengerConnects
          id={id}
          setId={setId}
          setConversationId={setConversationId}
          setStartAChat={setStartAChat}
          setActiveConversation={setActiveConversation}
          activeConversation={activeConversation}
          initializing={initializing}
        />
        <MuonButton
          content="Start new chat"
          className="w-100 my-4 muon-start-chat-btn"
          onClick={() => {
            setStartAChat(true);
            setActiveConversation(false);
            history.push('/messenger');
          }}
        />
      </section>
      <section>
        <MessageBox
          startAChat={startAChat}
          conversationId={conversationId}
          setConversationId={setConversationId}
          initializing={initializing}
          setInitializing={setInitializing}
          setOpenAdd={setOpenAdd}
          openAdd={openAdd}
          currentChat={currentChat}
          conversation={conversation}
          setConversation={setConversation}
          loading={loading}
          setLoading={setLoading}
          messages={messages}
          setMessages={setMessages}
          mutate={mutate}
          text={text}
          setText={setText}
        />
      </section>
    </div>
  );
};
