import React, { useContext } from "react";
import { AuthContext } from "../../context/auth";
import "./personCard.css";
import lock from "../../assets/images/lock.svg";
import { MuonButton } from "../index";
import placeholder from "../../assets/images/avatarHolder.webp";
import { useHistory } from "react-router";
import { API_PATH } from "../../utils/constants";

const PersonCard = ({ person }) => {
  const auth = useContext(AuthContext);

  const history = useHistory();

  const picLink = () => {
    if (
      person &&
      person.profileImage &&
      typeof person.profileImage === "string"
    )
      return API_PATH + "/" + person.profileImage.replace("\\", "/");
    else return placeholder;
  };

  const addPlaceholder = (e) => {
    e.target.src = placeholder;
  };

  return (
    <div className="muon-person-card">
      <section className="d-flex align-items-center">
        <div>
          <img
            src={picLink()}
            alt="person"
            className="muon-person-dp"
            onError={addPlaceholder}
          />
        </div>
        <div>
          <a href={`/profile/${person?._id}`}>
            <p className="muon-person-name">{person?.name}</p>
          </a>
          <div className="muon-person-label">
            <p>{person?.label ?? person.industryType}</p>
          </div>
        </div>
      </section>

      <section className="muon-person-desc">
        <p>
          {person?.coolInfo.substr(0, 30) ?? person.coolInfo.substr(0, 30)}
          {person?.coolInfo.length > 30 && "..."}
        </p>

        <p>
          Raised :{person?.ticketRaised}
          <b>$</b>
        </p>

        <p>
          Looking for : <b>{person?.ticketToRaise} $</b>
        </p>
      </section>

      <section className="d-flex justify-content-center align-items-center">
        {auth.isSignedIn ? (
          <MuonButton
            className="d-flex align-items-center justify-content-center w-100"
            content="View pitchdeck"
            onClick={() => history.push(`/profile/${person?._id}`)}
          />
        ) : (
          <MuonButton
            className="d-flex align-items-center justify-content-center w-100"
            content={
              <>
                <img src={lock} alt="lock" className="muon-person-lock" />
                View pitchdeck
              </>
            }
          />
        )}
      </section>
    </div>
  );
};

export { PersonCard };
