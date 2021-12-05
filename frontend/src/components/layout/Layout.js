import React from "react";
import { Header, Footer } from "../index";
import { useHistory } from "react-router";
import logo from "../../assets/images/logo.svg";

const Layout = ({ children, auth }) => {
  const { location } = useHistory();

  return (
    <div>
      {location.pathname === "/founder/signup" ||
      location.pathname === "/pricing" ||
      location.pathname === "/payment" ? (
        <div className="muon-nav-non">
          <img src={logo} alt="" />
        </div>
      ) : (
        <Header />
      )}
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export { Layout };
