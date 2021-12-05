import React, { useState } from 'react';
import videoIcon from '../../../assets/images/videoIcon.svg';
import settingIcon from '../../../assets/images/settingIcon.svg';
import addPerson from '../../../assets/images/addPersonVec.svg';
import {
  deleteConversation,
  getAllParticipants,
} from '../../../queries/messageTab';

export const MessengerHeader = ({
  chatTitle = '',
  conversation,
  setOpenAdd,
  openAdd,
  setInitializing,
  setParticipants,
  setConversation,
  setConversationId,
}) => {
  const title =
  conversation?.participants?.filter(
    (participant) => participant?._id !== localStorage.getItem('id')
   ).map((participant) => participant.name).join(', ') || '';


  const getParticipants = async () => {
    let res = await getAllParticipants();
    res = res?.filter(
      (r) => r?.participant?._id !== localStorage.getItem('id')
    );
    setParticipants([...(res ?? [])]);
  };

  const handleDeleteConversation = async () => {
    setInitializing(true);
    const delConv = await deleteConversation(conversation?._id);
    setConversation({});
    setConversationId(null);
    setInitializing(false);
    return delConv;
  };

  return (
    <section className="d-flex align-items-center justify-content-between muon-message-box-header">
      <div className="d-flex align-items-center">
        <p className="mb-0 mr-4">
          Chat with <span>{title}</span>
        </p>
        <p className="mb-0">
          Last Online : <span>few minutes ago</span>
        </p>
      </div>
      <div className="d-flex align-items-center">
        <section className="mr-4" role="button">
          <img
            style={{
              display: conversation?._id ? '' : 'none',
            }}
            src={addPerson}
            alt="add person"
            onClick={() => {
              getParticipants();
              setOpenAdd(!openAdd);
            }}
          />
        </section>
        <section className="dropdown">
          <img
            style={{
              display: conversation?._id ? '' : 'none',
            }}
            src={videoIcon}
            alt="video call"
            className="mr-4"
            role="button"
            data-toggle="dropdown"
            id="videoDropdown"
          />
          <div
            className="dropdown-menu"
            aria-labelledby="videoDropdown"
            style={{
              borderRadius: 12,
            }}
          >
            <button className="dropdown-item border-bottom" type="button">
              Start video call now
            </button>
            <button className="dropdown-item" type="button">
              Schedule video call
            </button>
          </div>
        </section>
        <section className="dropdown">
          <img
            style={{
              display: conversation?._id ? '' : 'none',
            }}
            src={settingIcon}
            alt="settings"
            role="button"
            id="settingDropdown"
            data-toggle="dropdown"
          />
          <div
            className="dropdown-menu"
            aria-labelledby="settingDropdown"
            style={{ borderRadius: 12 }}
          >
            <button
              className="dropdown-item border-bottom"
              type="button"
              onClick={handleDeleteConversation}
            >
              Delete Conversation
            </button>
            <button className="dropdown-item" type="button">
              Archive conversation
            </button>
          </div>
        </section>
      </div>
    </section>
  );
};
