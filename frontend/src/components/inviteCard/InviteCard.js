import React from "react";
import "./inviteCard.css";
import vector from "../../assets/images/inviteillustration.svg";
import { InviteModal, SuccessfulRefer } from "../index";

const InviteCard = () => {
  return (
    <div className="muon-invite-card d-flex align-items-center">
      <InviteModal />
      <SuccessfulRefer />
      <section>
        <p className="">Invite more founders and investors</p>
        <button
          className="muon-choose-btn bg-white mt-1"
          style={{ height: 29 }}
          data-toggle="modal"
          data-target="#inviteModal"
        >
          <p>Invite now</p>
        </button>
      </section>
      <section className="hide_vec">
        <img src={vector} alt="vector" className="invite-vector" />
      </section>
    </div>
  );
};

export { InviteCard };
