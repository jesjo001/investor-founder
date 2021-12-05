import React, { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { socket } from '../../../App';
import paperclip from '../../../assets/images/paperclipLight.svg';
import send from '../../../assets/images/send.svg';

export const MessengerInput = ({
  conversationId,
  conversation,
  currentChat,
  mutate,
  text,
  setText
}) => {


  // useEffect(() => {}, [conversationId]);

  const userId = localStorage.getItem('id');

  
  const handleSendChat = async (e) => {
    e.preventDefault();
    setText(text.trim());
    try {
      text && await mutate({
        text,
        id: conversationId,
      });
      setText('');
    } catch (err) {
      console.error(err);
    }
    conversation?.participants?.length > 2
      ? socket?.emit('sendChat', {
          senderId: userId,
          receiverId: conversation?._id,
          text,
          isGroup: true,
        })
      : socket?.emit('sendChat', {
          senderId: userId,
          receiverId: currentChat._id,
          text,
          isGroup: false,
        });
    // //Check if user is online else notify them
    socket?.emit('MESSAGE_REQUEST', userId, currentChat._id);
  };
  return (
    <form className="d-flex align-items-center muon-messenger-input">
      <input
        type="text"
        disabled={!conversationId ? true : false}
        placeholder={
          !conversationId
            ? 'Select a connection to start a chat'
            : 'Write your message'
        }
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <img src={paperclip} alt="input files" />
      <button
        className="muon-messenger-btn"
        onClick={handleSendChat}
        disabled={!conversationId ? true : false}
      >
        <img src={send} alt="send" />
      </button>
    </form>
  );
};
