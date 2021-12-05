import React, { useContext } from "react";
import lock from "../../assets/images/lock.svg";
import { MuonButton } from "../index";
import "./investorCard.css";
import { AuthContext } from "../../context/auth";
import placeholder from "../../assets/images/avatarHolder.webp";
import { useHistory } from "react-router";
import TicketSize from "../../pages/becomeMember/components/TicketSize";
import { API_PATH } from "../../utils/constants";

const InvestorCard = ({ investor }) => {
  const auth = useContext(AuthContext);

  const history = useHistory();

  console.log(investor)
  const picLink = () => {
    if (investor 
      && investor.profileImage != null 
      && typeof(investor.profileImage) === 'string'
    ) return API_PATH + '/' + investor.profileImage.replace("\\", "/");
      else return placeholder
  }

  const addPlaceholder = (e) => {
    e.target.src = placeholder;
  };

  return (
    <div className="muon-person-card">
      <section className="d-flex align-items-center">
        <div>
          <img
            src={picLink()?? picLink()}
            alt="person"
            className="muon-person-dp"
            onError={addPlaceholder}
          />
        </div>
        <div>
        <a href={`/profile/${investor?._id}`}>
          <p className="muon-person-name">{investor.name}</p>
          </a>
          <div className="muon-person-label">
            <p>{investor?.label ?? `Ready to invest: Up to ${investor?.ticketSize}`}</p>
          </div>
        </div>
      </section>

      <section className="muon-person-desc">
        <p className="muon-investor-card-txt">
          Financial executive and cleantech enthusiast who loves all things new.
          Here to see what we can achieve together...
        </p>

        <h2 className="muon-investor-passion">Passion about:</h2>
        <p className="muon-investor-card-txt">
          I use the approach that redefines investment banking, inspires for
          action & speeds up startup growth.
        </p>
      </section>

      <section className="d-flex justify-content-center">
        {auth.isSignedIn ? (
          <MuonButton
            className="d-flex align-items-center justify-content-center w-100"
            content="Read more"
            onClick={() => history.push(`/profile/${investor._id}`)}
          />
        ) : (
          <MuonButton
            className="d-flex align-items-center justify-content-center w-100"
            content={
              <>
                <img src={lock} alt="lock" className="muon-person-lock" />
                Read more
              </>
            }
          />
        )}
      </section>
    </div>
  );
};

export { InvestorCard };
