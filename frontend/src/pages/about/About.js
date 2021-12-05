import "./about.css";
import aboutVec from "../../assets/images/aboutVec.svg";
import howItBegan from "../../assets/images/howItBegan.png";
import companyValues from "../../assets/images/companyValues.png";
import connectCapital from "../../assets/images/connectCapital.png";
import personalGood from "../../assets/images/personalGood.png";
import fundraising from "../../assets/images/fundraising.png";
import provideService from "../../assets/images/provideService.png";

const About = () => {
  return (
    <div className="muon-about">
      <section className="muon-about-intro">
        <div className="muon-about-content">
          <section className="d-flex flex-column justify-content-center">
            <h2 className="muon-about-title">About Muon Club</h2>
            <p>
              Muon Club is a close-knit community of successful investors and
              start-up founders who share the same vision and translate it into
              success. Connection, audacity, and ambition are the words that
              best describe us.
            </p>
            <p>
              Join us at the cutting edge of innovation and connectivity and
              let’s make the impossible a reality.
            </p>
          </section>
          <section className="d-flex flex-column justify-content-center">
            <img src={aboutVec} alt="about vector" className="muon-about-vec" />
          </section>
        </div>
      </section>

      <section className="muon-more-about">
        <div className="muon-about-content">
          <section className="d-flex flex-column justify-content-center">
            <h4 className="muon-more-title">How it all began</h4>
            <p className="mb-0">
              Muon Club came into existence as a result of the collective effort
              to put an end to the frustrations of many start-up founders and
              investors, improve their communication, and make fundraising
              easier, faster, and more successful.
            </p>
            <p>
              In an instant, we decided to build something completely out of
              this world: a personalized community to increase your network,
              exposure, get access to capital and dominate the market. Our team
              comes from different backgrounds, we may not always agree with one
              another, but we share the same vision: to create new opportunities
              and make you successful.
            </p>
          </section>
          <section className="d-flex flex-column justify-content-center">
            <img
              src={howItBegan}
              alt="how it began"
              className="muon-about-more-img"
            />
          </section>
        </div>
      </section>

      {/* Carousel here */}
      <h4 className="muon-more-title" style={{padding: "0 8.33%"}}>Our philosophy</h4>

      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators muon-slider">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="muon-carousel-indicator active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1" className="muon-carousel-indicator"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2" className="muon-carousel-indicator"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="3" className="muon-carousel-indicator"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active" data-interval="3000">
            <section className="muon-more-about">
              <div
                className="muon-about-content"
                style={{ background: "white" }}
              >
                <section className="d-flex flex-column justify-content-center">
                  <h4 className="muon-more-sub">
                    Connect captial with innovative ideas
                  </h4>
                  <ul className="muon-phil-list">
                    <li>
                      Muon Club has the largest database of top investors and
                      outstanding start-up founders.
                    </li>

                    <li>
                      Like the universe itself, our database keeps expanding,
                      adding up new investors and new talent.
                    </li>

                    <li>
                      Our screening process ensures the greatest chances of
                      success for everyone.
                    </li>
                  </ul>
                </section>
                <section className="d-flex flex-column justify-content-center">
                  <img
                    src={connectCapital}
                    alt="connect capital"
                    className="muon-about-more-img muon-carousel-img"
                  />
                </section>
              </div>
            </section>
          </div>
          <div className="carousel-item" data-interval="3000">
            <section className="muon-more-about">
              <div
                className="muon-about-content"
                style={{ background: "white" }}
              >
                <section className="d-flex flex-column justify-content-center">
                  <h4 className="muon-more-sub">
                    Make it personal. In a good way
                  </h4>
                  <ul className="muon-phil-list">
                    <li>
                      We create an informal environment that facilitates the
                      free exchange of ideas and information to let you raise
                      capital and maximize your returns.
                    </li>

                    <li>
                      We put you in touch with the decision-makers, as well as
                      outstanding start-up founders, and make magic happen.
                    </li>

                    <li>
                      We organize small, invitation-only events to help you make
                      meaningful personal connections and achieve your goals.
                    </li>
                  </ul>
                </section>
                <section className="d-flex flex-column justify-content-center">
                  <img
                    src={personalGood}
                    alt="personal"
                    className="muon-about-more-img muon-carousel-img"
                  />
                </section>
              </div>
            </section>
          </div>
          <div className="carousel-item" data-interval="3000">
            <section className="muon-more-about">
              <div
                className="muon-about-content"
                style={{ background: "white" }}
              >
                <section className="d-flex flex-column justify-content-center">
                  <h4 className="muon-more-sub">
                    Focus exclusively on fundraising
                  </h4>
                  <ul className="muon-phil-list">
                    <li>
                      We prepare you and provide personalized support as you
                      progress through fundraising stages.
                    </li>

                    <li>
                      We provide a secure environment to discuss and sign your
                      deals.
                    </li>

                    <li>
                      We give you exposure and freedom to start raising capital
                      now.
                    </li>
                  </ul>
                </section>
                <section className="d-flex flex-column justify-content-center">
                  <img
                    src={fundraising}
                    alt="fundraising"
                    className="muon-about-more-img muon-carousel-img"
                  />
                </section>
              </div>
            </section>
          </div>

          <div class="carousel-item" data-interval="3000">
            <section className="muon-more-about">
              <div
                className="muon-about-content"
                style={{ background: "white" }}
              >
                <section className="d-flex flex-column justify-content-center">
                  <h4 className="muon-more-sub">
                    Provide the service you deserve
                  </h4>
                  <ul className="muon-phil-list">
                    <li>
                      Increase your outreach by visiting our tailored networking
                      events.
                    </li>

                    <li>
                      Gain more visibility by publishing exclusive content in
                      our blog.
                    </li>

                    <li>
                      You can cancel and renew your membership at any time.
                    </li>
                  </ul>
                </section>
                <section className="d-flex flex-column justify-content-center">
                  <img
                    src={provideService}
                    alt="provide service"
                    className="muon-about-more-img muon-carousel-img"
                  />
                </section>
              </div>
            </section>
          </div>
        </div>
       
      </div>
      {/*End of  Carousel here */}

      <section className="muon-more-about">
        <div className="muon-about-content">
          <section className="d-flex flex-column justify-content-center">
            <h4 className="muon-more-title">Company values</h4>
            <p className="mb-0">
              We live in a unique time, where technology instantly connects
              people and ideas across the globe, allowing us to concentrate on
              the things that really matter and achieve more than we have ever
              imagined. In so many cases, it all comes down to meeting the right
              person at the right time. And we know it like no one else because
              Muon Club is the result of such an impromptu encounter.
            </p>
            <p>
              At Muon Club, we are building a new kind of community that offers
              the support you lack and provides the motivation and guidance that
              no one else can offer. Because you are family. Join Muon Club and
              reap the benefits of connectivity and driving growth. Let’s do it
              together.
            </p>
          </section>
          <section className="d-flex flex-column justify-content-center">
            <img
              src={companyValues}
              alt="company values"
              className="muon-about-more-img"
            />
          </section>
        </div>
      </section>
    </div>
  );
};

export default About;
