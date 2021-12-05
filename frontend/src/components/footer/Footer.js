import "./footer.css";
import linkedIn from "../../assets/images/linkedinIcon.svg";
import twitter from "../../assets/images/twitter.svg";
import facebook from "../../assets/images/facebookIcon.svg";

const Footer = () => {
  return (
    <div className="muon-footer">
      <section className="muon-footer-container">
        <article className="muon-footer-main">
          <header className="muon-title-footer">Muon Club</header>
          <p className="muon-footer-about muon-footer-aboutApp">
            Muon Club connects investors with start-up founders through a series
            of offline and virtual reality events, and facilitates the
            fundraising process
          </p>
          <p className="muon-footer-about muon-footer-aboutCompany">
            Muon Club LLC. All rights reserved
          </p>
          <section
            className="d-flex align-items-center footer-socials"
            style={{ columnGap: 10 }}
          >
            <a
              href="https://www.linkedin.com/company/muon-club/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedIn} alt="LinkedIn" />
            </a>

            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebook} alt="facebook" />
            </a>

            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitter} alt="twitter" />
            </a>
          </section>
        </article>

        <article className="muon-footer-company">
          <h3 className="muon-footer-list-title">Company</h3>
          <ul className="muon-footer-list">
            <li>
              <a href="/">Home</a>
            </li>
            {/* <li>
              <a href="/about">Contact</a>
            </li> */}
          </ul>
        </article>

        <article className="muon-footer-contact">
          <h3 className="muon-footer-list-title">Contact</h3>
          <ul className="muon-footer-list">
            <li>
              <a href="/about">About Us</a>
            </li>
          </ul>
        </article>

        <article className="muon-footer-more">
          <h3 className="muon-footer-list-title">More info</h3>
          <ul className="muon-footer-list">
            <li>
              <a href="/privacy-policy" target="_blank">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms-conditions" target="_blank">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </article>
      </section>
    </div>
  );
};

export { Footer };
