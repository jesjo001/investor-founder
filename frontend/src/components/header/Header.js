import { useContext, useEffect, useState } from "react";
import "./header.css";
import { MuonButton } from "../index";
import { useHistory } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import notification from "../../assets/images/notificationIcon.svg";
import user from "../../assets/images/avatarHolder.webp";
import investor from "../../assets/images/investorIcon.svg";
import founder from "../../assets/images/founderIcon.svg";
import message from "../../assets/images/messageIcon.svg";
import home from "../../assets/images/home.svg";
import notice from "../../assets/images/noticeIcon.svg";
import { logout } from "../../utils/auth";
import { AuthContext } from "../../context/auth";
import useUserInfoQuery from "../../queries/userInfo";
import { API_PATH } from "../../utils/constants";
import dashboard from "../../assets/images/dashboard.svg";
import profile from "../../assets/images/profile.svg";
import settings from "../../assets/images/settings.svg";
import logoutIcon from "../../assets/images/logout.svg";
import eventIcon from "../../assets/images/calendarIcon.svg";
import { Notification } from "../index";
import person from "../../assets/images/avatarHolder.webp";
import { socket } from "../../App";
import LinkPage from "../subcomponent/link";

const Header = () => {
  const { isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const { data } = useUserInfoQuery("me");
  const history = useHistory();
  const [countNotify, setCount] = useState([]);

  const addPlaceholder = (e) => {
    e.target.src = person;
  };

  useEffect(() => {
    //Get Notification Count for unread notification
    if (isSignedIn) {
      return GetCountNotification();
    }

    socket.on("ClearAll", async () => {
      return setCount([]);
    });
  });

  async function GetCountNotification() {
    const getAllCount = await fetch(`${API_PATH}/Notification/Count`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const res = await getAllCount.json();
    if (res.count) {
      setCount(res.count);
    }
  }
  return (
    <div className="muon-nav">
      {/* <LinkPage/> */}
      <div>
        <a
          href={
            localStorage.getItem("role") === "Investor"
              ? "/investor/dashboard"
              : localStorage.getItem("role") === "Founder"
              ? "/founder/dashboard"
              : "/"
          }
        >
          <img src={logo} alt="logo" role="button" />
        </a>
      </div>

      <div className="d-flex align-items-center muon-desktop-menu">
        <ul className="muon-nav-items">
          {/* <li>
            <a
              href={
                localStorage.getItem("role") === "Investor"
                  ? "/investor/dashboard"
                  : localStorage.getItem("role") === "Founder"
                  ? "/founder/dashboard"
                  : "/"
              }
            >
              Home
            </a>
          </li> */}
          {isSignedIn && (
            <li>
              <a href="/" className="text-center">
                <>
                  <div className="text-center">
                    <img src={home} alt="home" />
                  </div>
                  <p>Home</p>
                </>
              </a>
            </li>
          )}

          {isSignedIn && (
            <li>
              <a href="/investors" className="text-center">
                <div className="text-center">
                  <img src={investor} alt="investor" />
                </div>
                <p>Investors</p>
              </a>
            </li>
          )}

          {isSignedIn && (
            <li>
              <a href="/founders">
                <div className="text-center">
                  <img src={founder} alt="founder" />
                </div>
                <p>Founders</p>
              </a>
            </li>
          )}

          {/* <li>
            <a href="/events">
              {isSignedIn ? (
                <>
                  <div className="text-center">
                    <img src={eventIcon} alt="events" width="20" height="20" />
                  </div>
                  <p>Events</p>
                </>
              ) : (
                <p className="muon-nav-p">Events</p>
              )}
            </a>
          </li> */}
          <li>
            <a href="/blogs">
              {isSignedIn ? (
                <>
                  <div className="text-center">
                    <img src={eventIcon} alt="events" width="20" height="20" />
                  </div>
                  <p>Blogs</p>
                </>
              ) : (
                <p className="muon-nav-p">Blogs</p>
              )}
            </a>
          </li>
          {isSignedIn && (
            <li>
              <a href="/messenger">
                <div className="text-center">
                  <img src={message} alt="message" />
                </div>
                <p>Messaging</p>
              </a>
            </li>
          )}

          {isSignedIn && (
            <li>
              <section style={{ position: "relative" }} className="dropdown">
                <div id="noticeMenu" role="button" data-toggle="dropdown">
                  <div className="text-center" style={{ position: "relative" }}>
                    <img src={notice} alt="" />
                    {countNotify >= 1 ? (
                      <div className="muon-notice-count">{countNotify}</div>
                    ) : null}
                  </div>
                  <p>Notifications</p>
                </div>

                <div className="">
                  <Notification />
                </div>
              </section>
            </li>
          )}

          {!isSignedIn && (
            <li>
              <a href="/about">
                {/* <div className="text-center">
                  <img src={message} alt="message" />
                </div> */}
                About Us
              </a>
            </li>
          )}
          {isSignedIn && (
            <li className="mr-0">
              <div className="dropdown">
                <img
                  src={data?.profileImage ? data?.profileImage : user}
                  alt="user"
                  role="button"
                  className="muon-user-header"
                  id="dropdownMenu2"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onError={addPlaceholder}
                />
                <div
                  className="dropdown-menu muon-user-dropdown border-0"
                  aria-labelledby="dropdownMenu2"
                >
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      const role = localStorage.getItem("role");
                      if (role === "Investor") {
                        history.push("/investor/dashboard");
                      } else if (role === "Founder") {
                        history.push("/founder/dashboard");
                      } else {
                        history.push("/");
                      }
                    }}
                  >
                    <img src={dashboard} alt="dashboard" /> Dashboard
                  </button>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      const role = localStorage.getItem("role");
                      if (role === "Investor") {
                        history.push("/profile/investor");
                      } else if (role === "Founder") {
                        history.push("/profile/founder");
                      } else {
                        history.push("/");
                      }
                    }}
                  >
                    <img src={profile} alt="profile" /> My Profile
                  </button>
                  {/* <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => {
                      history.push(`/Blog/${localStorage.getItem("id")}`);
                    }}
                  >
                    <img src={logoutIcon} alt="logout" /> Blog
                  </button> */}
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      const role = localStorage.getItem("role");
                      if (role === "Investor") {
                        history.push("/investor/profile");
                      } else if (role === "Founder") {
                        history.push("/founder/profile");
                      } else {
                        history.push("/");
                      }
                    }}
                  >
                    <img src={settings} alt="settings" /> Settings
                  </button>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => {
                      logout();
                      setIsSignedIn(false);
                      history.push("/signin");
                    }}
                  >
                    <img src={logoutIcon} alt="logout" /> Logout
                  </button>
                </div>
              </div>
            </li>
          )}
        </ul>
        {!isSignedIn && (
          <div>
            <MuonButton
              content="Log in / Sign up"
              onClick={() => history.push("/signin")}
            />
          </div>
        )}
      </div>
      <section
        className="muon-hamburger"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className={`${open ? "open-top" : "close-menu"}`}></div>
        <div className={`${open ? "open-middle" : "close-menu"}`}></div>
        <div className={`${open ? "open-bottom" : "close-menu"}`}></div>
      </section>
      <section
        className={`${
          open ? "show-mobile-menu" : "hide-mobile-menu"
        } muon-mobile-menu shadow-sm`}
      >
        {!isSignedIn && (
          <ul>
            <li>
              <a href="/investors">
                <p>Investors</p>
              </a>
            </li>
            <li>
              <a href="/founders">Founders</a>
            </li>
            <li>
              <a href="/investors">Events</a>
            </li>
            {/* <li>
              <img src={notification} alt="notification" role="button" />
            </li> */}
          </ul>
        )}

        {/* Logged in Mobile Nav */}
        {isSignedIn && (
          <ul>
            <li>
              <a href="/investors">
                <p>Investors</p>
              </a>
            </li>
            <li>
              <a href="/founders">Founders</a>
            </li>
            <li>
              <a href="/events">Events</a>
            </li>
            <li>
              <a href="/messenger">Messaging</a>
            </li>
            {/* <li>
              <img src={notification} alt="notification" role="button" />
            </li> */}
          </ul>
        )}
        {!isSignedIn && (
          <div style={{ paddingLeft: "8.33%" }}>
            <MuonButton
              content="Login / Signup"
              onClick={() => {
                history.push("/signin");
                setOpen(false);
              }}
            />
          </div>
        )}
      </section>
      {/* MOBILE NAVIGATION */}
    </div>
  );
};

export { Header };
