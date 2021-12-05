import React from "react";
import "./privacyPolicy.css";

export const PrivacyPolicy = () => {
  return (
    <div className="muon-terms-condition">
      <h2>Privacy & Policy</h2>

      <div className="muon-condition-item">
        <h4>1. Introduction</h4>
        <p>
          This is a description of how your personal data is collected, used and
          deleted while you visit our website{" "}
          <a href="https://www.muon.club">www.muon.club</a>, register your
          account for subscription and using our products or services.
        </p>
        <p>
          The Controller of your personal data is legal entity Muon Club OÜ,
          registry code 16213494, address Hobujaama tn 4, 10151 Tallinn, Estonia
          (“MUON CLUB”, “we”, “us”).
        </p>
      </div>

      <div className="muon-condition-item">
        <h4>2. How we get the personal information?</h4>
        <p>
          The personal information we process is provided to us directly by you
          in order to register yourself as our Platform User and using our
          services. The data you insert during the subscription is mainly
          voluntary except your full name (required fields are marked
          accordingly). This means that the amount of personal data you provide
          to us depends highly on your decision.
        </p>
        <p>
          In addition, we may also collect your personal data indirectly. When
          visiting our website, we and our service providers, may collect
          certain data using tracking technologies like cookies, web beacons and
          similar technologies. Use of web cookies are described on our website
          in cookie banner.
        </p>
        <p>
          Indirectly collected data may fall under the terms of third-party
          privacy policies while they act as an independent data controllers.
          Please read those separately.
        </p>
      </div>

      <div className="muon-condition-item">
        <h4>3. What kind of data is processed and why?</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Processing activity</th>
              <th style={{ width: "40%" }}>Data categories</th>
              <th>Purpose</th>
              <th>Legal basis</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>User subscription</td>
              <td>Name, Picture, Email, Role (Founder/Investor)</td>
              <td>User account creation</td>
              <td>Contract </td>
            </tr>
            <tr>
              <td>Information provided by users</td>
              <td>
                <p>
                  Profile information, Founders: Expertise, Industry, Year of
                  establishment, Co-founders, Stage, Fundraising amount
                  (past&current), Investors, Pitchdeck
                </p>
                <p>
                  Profile information, Investors: Investor type, Expertise,
                  Start-ups, Ticket size, Industries, Stages, Locations (where
                  start-ups should be located)
                </p>
              </td>
              <td>Creating User profile</td>
              <td>Legitimate interest</td>
            </tr>
            <tr>
              <td>Website and related product maintenance and quality</td>
              <td>
                IP address of the device, Device screen size, Device type
                (unique device identifiers), Browser information, Geographic
                location (country only)
              </td>
              <td>Providing the web Platform, Cookies and Sessions</td>
              <td>Contract</td>
            </tr>
            <tr>
              <td>Web visitor analytics</td>
              <td>
                Online identifiers (including cookie identifiers and IP
                addresses)
              </td>
              <td>Website visitor statistics</td>
              <td>Consent</td>
            </tr>
            <tr>
              <td>Newsletters and offers, event invitations</td>
              <td>Name, E-mail address</td>
              <td>Marketing</td>
              <td>Consent</td>
            </tr>

            <tr>
              <td>User request resolving</td>
              <td>Name, E-mail, User request and communication</td>
              <td>Customer support</td>
              <td>Contract</td>
            </tr>
            <tr>
              <td>Chats</td>
              <td>Chats between users</td>
              <td>History retention</td>
              <td>Consent</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="muon-condition-item">
        <h4>4. Sharing your personal data</h4>
        <p>
          Any data you provide will not be publicly displayed or shared to other
          Users. MUON CLUB employees and business partners have access to
          personal data to the extent necessary for the performance of their
          work duties.
        </p>
        <p>We use third party processors to help provide our service.</p>

        <h4>Why and with whom we share your personal data?</h4>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th style={{ width: "30%" }}>Categories of Recipients</th>
              <th>Reason for sharing</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Service providers</td>
              <td>
                We work with service providers that work on our behalf which may
                need access to certain personal data to provide their services
                to us. These companies include those we have hired to operate
                the technical infrastructure that we need to provide service and
                assist in protecting and securing our systems and services.
              </td>
            </tr>
            <tr>
              <td>Payment providers</td>
              <td>
                For paid services you interact directly to payment service
                providers available on our Platform, who process your data as
                data controllers and thus their privacy notice apply.
              </td>
            </tr>
            <tr>
              <td>Advertising partners</td>
              <td>
                We work with advertising partners to enable us to customize the
                advertising content you may receive. These partners help us
                deliver more relevant ads and promotional messages to you, which
                may include interest-based advertising (also known as online
                behavioral advertising), contextual advertising, and generic
                advertising (Google Ads, Facebook Ads). We and our advertising
                partners process certain personal data to help us understand
                your interests or preferences so that we can deliver
                advertisements that are more relevant to you.
              </td>
            </tr>
          </tbody>
        </table>

        <p className="my-4">
          <i>International transfers</i>
        </p>
        <p>
          Some of our processing is cloud based so your personal information
          might be sent outside the European Economic Area. In such instances we
          will ensure that the transfer of your personal data is carried out in
          accordance with applicable privacy laws and, in particular, that
          appropriate contractual, technical, and organisational measures are in
          place.{" "}
        </p>
      </div>

      <div className="muon-condition-item">
        <h4>5. Ensuring the security of personal data</h4>
        <p>
          We have taken necessary technical and organizational security measures
          to protect your personal data against accidental or unlawful
          destruction, loss or alteration and against the unauthorized
          disclosure, abuse or other processing in violation of applicable law.
        </p>
        <p>
          This includes: Identity and access management; Preventing unauthorized
          viewing of personal data; Deliberately set password requirements;
          Structurally safe network design; Encryption system; Data loss
          prevention (DLP); Offline storage backup and other relevant
          continuously updated security measures.
        </p>
      </div>

      <div className="muon-condition-item">
        <h4>6. Retention and deletion of personal data</h4>
        <p>
          The storage period of personal data depends on whether we have legal
          obligations to store data (i.e accounting regulations), contractual
          obligations, legitimate interest to provide best services or your
          explicit consent
        </p>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th style={{ width: "40%" }}>Data Type</th>
              <th>Purpose</th>
              <th>Retention Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Name, Gender, Picture, Date of birth, Country of residence,
                Password, Username
              </td>
              <td>User account management</td>
              <td>Until account deletion or 2 years after last action</td>
            </tr>
            <tr>
              <td>
                Profile information for example experience, track record,
                previous projects, field of business etc
              </td>
              <td>Creating User profile</td>
              <td>Until account deletion or request for data removal</td>
            </tr>
            <tr>
              <td>Name, Email address, Newsletter consent</td>
              <td>Marketing</td>
              <td>Until withdrawal of consent</td>
            </tr>
            <tr>
              <td>
                IP address of the device, Device screen size, Device type
                (unique device identifiers), Browser information, Geographic
                location (country only)
              </td>
              <td>Providing the website service</td>
              <td>
                <p>A session for 15 days</p> <p>Cookies data for 3 days</p>
                <p>Device and usage data on the server for 5 days</p>
              </td>
            </tr>

            <tr>
              <td>
                Online identifiers (including cookie identifiers and IP
                addresses)
              </td>
              <td>Website visitor statistics</td>
              <td>Until withdrawal of consent</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="muon-condition-item">
        <h4>7. Your rights and preferences</h4>
        <p>Under data protection law, you have rights including:</p>
        <ol>
          <li className="mb-2">
            Right to be informed and to access. You may get information
            regarding your personal data processed by us.
          </li>
          <li className="mb-2">
            Right to data portability. You have the right to receive your
            personal data from us in a structured, commonly used and
            machine-readable format and to independently transmit those data to
            a third party.
          </li>
          <li className="mb-2">
            Right to erasure. You have the right to have personal data we
            process about you erased from our systems if the personal data are
            no longer necessary for the related purposes.
          </li>
          <li className="mb-2">
            Right to object and restrict. You have the right to object to the
            processing of your personal data and restrict it in certain cases.
          </li>
          <li className="mb-2">
            Right to rectification. You have the right to make corrections to
            your personal data.{" "}
          </li>
          <li className="mb-2">
            Right to withdraw consent. When you have given us consent to process
            your personal data, you may withdraw said consent at any time.
          </li>
        </ol>
        <p>
          To exercise any of the abovementioned rights, please contact{" "}
          <a href="mailto:info@muon.club">info@muon.club</a>. We will respond to
          your requests within 30 days.
        </p>
      </div>

      <div className="muon-condition-item">
        <h4>8. Other important information</h4>
        <p>
          <i>Newsletter and direct marketing campaigns</i>
        </p>
        <p>
          With your explicit consent, we may send you our newsletter and
          marketing offers. You may opt out of these messages. Please note that
          email marketing messages include an opt-out mechanism within the
          message itself (e.g. an unsubscribe link in the emails we send to
          you). Clicking on the link in an email will opt you out of further
          messages. You may also opt-out on your account settings in case this
          option is available. We may also use social media tools to market our
          products and services. As social media and web analytics providers act
          as joint processors, there might be consent or opt-out requirements
          also on their side (Google Ads, Facebook Ads).
        </p>
        <p>
          <i>Dispute resolution</i>
        </p>
        <p>
          If you have questions or concerns about our use of your personal
          information, please feel free to contact us at{" "}
          <a href="mailto:info@muon.club">info@muon.club</a>. You may lodge a
          complaint to the supervisory authority, the Estonian Data Protection
          Inspectorate , <a href="mailto:info@aki.ee">info@aki.ee</a>
        </p>
        <p>
          <i>This Privacy Notice was updated July 2021.</i>
        </p>
      </div>
    </div>
  );
};
