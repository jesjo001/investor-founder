import React from "react";
import "./home.css";
import { useHistory } from "react-router-dom";
import logo from "../../assets/images/homeLogo.svg";
const Home = () => {
  let history = useHistory();

  /**
   *
   * @param {String} path route you want to open
   */
  const openPath = (path) => {
    history.push(path);
  };

  return (
    <main className="muon-bg">
      <nav>
        <h3 className="nav-title">
          <img src={logo} alt="logo" />
        </h3>
        {/* <ul className="muon-nav-list">
          <li
            onClick={() => {
              openPath("/investors");
            }}
          >
            Investors
          </li>
          <li
            onClick={() => {
              openPath("/founders");
            }}
          >
            Founders
          </li>
          <li>Events</li>
        </ul> */}
      </nav>
      <section className="muon-banner">
        <div>
          <div>
            <h1>Match with the top people</h1>
            <h2 className="mb-5"> and get to the top</h2>
            {/* <small class="muon-quote-author">-Milton Friedman</small> */}
            <p>
              Muon club connects founders with investors in the ways that
              facilitate communication and streamline the fundraising process.
            </p>
          </div>

          <div>
            <div className="muon-sub-form">
              <button
                className="muon-sub-btn"
                type="submit"
                onClick={() => {
                  openPath("/investors");
                }}
              >
                Investor
              </button>
              <button
                className="muon-sub-btn"
                type="submit"
                onClick={() => {
                  openPath("/founders");
                }}
              >
                Founder
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export { Home };
