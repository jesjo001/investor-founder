import './coFounder.css';
import person from "../../assets/images/samplePerson.png";

const CoFounder = () => {
    return (
        <div className="d-flex align-items-center muon-co-founder">
           <img src={person} alt="person" className="muon-image-cofounder"/>
                  <div>
                    <div className="d-flex align-items-center muon-result-name-label">
                      <span className="muon-result-name">Investor Name</span>
                    </div>
                    <p className="muon-result-desc w-100">
                      Building my own money remittance platform that features
                      lower rates and flexible solutions for...
                    </p>
                  </div> 
        </div>
    )
}

export {CoFounder}
