import React from 'react';
import sample from '../../../assets/images/avatarHolder.webp';

export const MessengerConnect = ({
  name = 'Darlene Black',
  active = true,
  profileImg,
}) => {
  const addDefaultSrc = (ev) => {
    ev.target.src = sample;
  }
  return (
    <div className="d-flex align-items-center muon-messenger-connect">
      <span className={active && 'active'}></span>
      <div className="d-flex align-items-center main">
        <section className="messenger-dp">
          <img src={profileImg} onError={addDefaultSrc} alt="messenger" />
          <span className={`messenger-status messenger-online`}></span>
        </section>
        <section className="muon-messenger-connect-txt">
          <p className="mb-0 name">{name}</p>
          {/* <p className="mb-0 message">Hey, how is your project?</p> */}
        </section>
      </div>
    </div>
  );
};
