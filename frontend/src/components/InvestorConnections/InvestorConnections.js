import './investorConnections.css';
import noConnectVec from '../../assets/images/noConnectVec.svg';
import person from '../../assets/images/avatarHolder.webp';
import { MuonButton } from '../../components/index';
import { API_PATH } from '../../utils/constants';

const InvestorConnections = ({
  connections = [1, 3, 4, 5],
  setChatWith,
  setStep,
  setOpen,
}) => {
  const connects = connections.filter(
    (conn) => conn?.participants?.length <= 2
  );
  console.log(connects);
  return (
    <div className="muon-connections">
      {connects.length > 0 ? (
        <section className="muon-connect">
          <h5>Your connections</h5>
          <div className="muon-founders-wrapper mt-0" style={{ height: 300 }}>
            {connects.map((connect, i) => {
              const currentUser = localStorage.getItem('email');
              const result = connect?.participants?.filter(
                (participant) => participant.email !== currentUser
              );
              return (
                <div key={`${i}`}>
                  <Connect
                    id={result[0]?._id ?? i}
                    data={result[0]}
                    setChatWith={setChatWith}
                    messageid={connect?._id ?? i}
                    setOpen={setOpen}
                    setStep={setStep}
                  />
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        <section className="muon-no-connect">
          <img src={noConnectVec} alt="no connections vector" />
          <h3>No connections yet</h3>
          <p>
            You currently don't have anyone in your network. Search and add your
            first connection now.
          </p>
        </section>
      )}
    </div>
  );
};

const Connect = ({ id, data, setChatWith, messageid, setOpen, setStep }) => {
  const addPlaceholder = (e) => {
    e.target.src = person;
  };
  return (
    <div
      className="d-flex align-items-center justify-content-between muon-connected"
      key={`${id}`}
    >
      <div className="d-flex align-items-center" style={{ flexBasis: '50%' }}>
        <img
          src={data?.profileImage ? `${API_PATH}/${data.profileImage}` : person}
          alt="person"
          onError={addPlaceholder}
          className="muon-connected-img"
        />
        <div>
          <a href={`/profile/${id}`}>
            <span className="muon-result-name">{data?.name ?? ''}</span>
          </a>
          {/* <span className="d-flex align-items-center connect-status">
          <div className={`status-indicator-online`}></div>
          <div className={`connect-online`}>Online</div>
        </span> */}
          <p className="muon-result-desc" style={{ width: 'fit-content' }}>
            {data?.email ?? ''}
          </p>
        </div>
      </div>

      <div
        style={{ flexBasis: '50%', width: '100%' }}
        className="d-flex justify-content-end"
      >
        <MuonButton
          content="Send message"
          onClick={(e) => {
            e.preventDefault();
            setChatWith({ name: data?.name, id: messageid, _id: id });
            setOpen(true);
            setStep(2)
          }}
        />
      </div>
    </div>
  );
};

export { InvestorConnections };
