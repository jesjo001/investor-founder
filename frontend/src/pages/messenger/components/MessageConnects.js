import React, { useEffect, useState } from 'react';
import { MessengerConnect } from './index';
import {
  getMyConversations,
  // getConversations,
} from '../../../queries/messageTab';
import { useHistory } from 'react-router-dom';
import sample from '../../../assets/images/avatarHolder.webp';
import { API_PATH } from '../../../utils/constants';

export const MessengerConnects = ({
  id,
  setId,
  setConversationId,
  conversationId,
  setStartAChat,
  activeConversation,
  setActiveConversation,
  initializing,
}) => {
  const [conversations, setConversations] = useState([]);
  // const [participants, setParticipants] = useState([]);
  console.log(initializing);
  const getAllConversations = async () => {
    let res = await getMyConversations();
    setConversations([...res]);
    // setConversationId([...res][0]?._id);
  };
  const history = useHistory();

  useEffect(() => {
    getAllConversations();
  }, [initializing]);

  return (
    <div className="muon-messenger-connects">
      <p className="mb-0 muon-messenger-connects-title">CONNECTIONS</p>
      {conversations?.map((conversation, i) => {
        return (
          <div
            key={`connect` + i}
            role="button"
            onClick={() => {
              setStartAChat(false);
              setActiveConversation(true);
              setId(conversation?._id);
              setConversationId(conversation?._id);
              history.push(`/messenger/${conversation?._id}`);
            }}
          >
            <MessengerConnect
              name={
                conversation?.participants?.length > 1
                  ? `${conversation?.participants[0]?.name}, ${
                      conversation?.participants[1]?.name
                    }${conversation?.participants?.length > 2 ? ',...' : ''}`
                  : conversation?.participants[0]?.name || ''
              }
              active={conversation?._id === id && activeConversation}
              profileImg={
                conversation?.participants?.length <= 1
                  ? `${API_PATH}/` + conversation?.participants[0]?.profileImage
                  : sample
              }
            />
          </div>
        );
      })}
    </div>
  );
};
