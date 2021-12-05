import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import {
  Home,
  InvestorsHome,
  FounderHome,
  SignIn,
  BecomeMember,
  FounderQuestionnaire,
  ReferStartupFounder,
  FounderDashboard,
  InvestorDashboard,
  TermsAndCondition,
  PrivacyPolicy,
  InvestorProfile,
  FounderProfile,
  Events,
  FounderPricing,
  FounderProfilePage,
  InvestorProfilePage,
  SingleEvent,
  ViewProfile,
  Messenger,
  // UserBlog,
  NotFound,
  ResetForgottenPassword,
  MuonBlog,
  EachMuonBlogPost,
  FounderQuestionnaire2,
  StripeContainer,
  CheckoutForm,
} from "./pages/index";
import { Layout } from "./components/index";
import { isAuthorized, checkPlanStatus } from "./utils/auth";
import About from "./pages/about/About";

const MainRoute = ({ Component, path, exact, purpose, auth, ...rest }) => {
  const [status, setStatus] = useState();

  const planStatus = async () => {
    const resp = await checkPlanStatus();
    setStatus(resp);
  };

  useEffect(() => {
    planStatus();
  });

  return (
    <Route
      exact={exact}
      path={path}
      {...rest}
      render={(props) => {
        return auth === undefined ? (
          <Layout>
            <Component {...rest} {...props} />
          </Layout>
        ) : isAuthorized(auth, status) === true ? (
          <Layout>
            <Component {...rest} {...props} />
          </Layout>
        ) : (
          <Redirect to="/signin" />
        );
      }}
    />
  );
};

function AppRoute() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <MainRoute path="/investors" Component={InvestorsHome} exact />
        <MainRoute path="/founders" Component={FounderHome} exact />
        <MainRoute path="/signin" Component={SignIn} exact />
        <MainRoute
          path="/investor/becomeMember"
          Component={BecomeMember}
          exact
        />
        <MainRoute
          path="/founder/becomeMember"
          Component={FounderQuestionnaire}
          exact
        />
        <MainRoute path="/founder/signUp" Component={FounderQuestionnaire2} />
        <MainRoute
          path="/referFounder"
          Component={ReferStartupFounder}
          exact
          auth={["Founder", "Investor"]}
        />
        <MainRoute
          path="/founder/dashboard"
          Component={FounderDashboard}
          exact
          auth={["Founder"]}
        />

        <MainRoute
          path="/investor/dashboard"
          Component={InvestorDashboard}
          auth={["Investor"]}
          exact
        />

        <MainRoute path="/about" Component={About} exact />
        <MainRoute
          path="/terms-conditions"
          Component={TermsAndCondition}
          exact
        />
        <MainRoute path="/privacy-policy" Component={PrivacyPolicy} exact />
        <MainRoute
          path="/investor/profile"
          Component={InvestorProfile}
          auth={["Investor"]}
          exact
        />
        <MainRoute
          path="/founder/profile"
          Component={FounderProfile}
          auth={["Founder"]}
          exact
        />
        <MainRoute path="/events" Component={Events} exact />
        <MainRoute path="/event/:id" Component={SingleEvent} exact />
        <MainRoute
          path="/pricing"
          Component={FounderPricing}
          exact
          // auth={["Founder"]}
        />
        <MainRoute
          path="/profile/founder"
          Component={FounderProfilePage}
          auth={["Founder"]}
          exact
        />
        <MainRoute
          path="/profile/investor"
          Component={InvestorProfilePage}
          auth={["Investor"]}
          exact
        />

        <MainRoute
          path="/profile/:id"
          Component={ViewProfile}
          auth={["Founder", "Investor"]}
          exact
        />

        <MainRoute
          path="/messenger"
          Component={Messenger}
          auth={["Founder", "Investor"]}
          exact
        />

        <MainRoute
          path="/messenger/:messageId"
          Component={Messenger}
          auth={["Founder", "Investor"]}
          exact
        />

        <MainRoute
          path="/blogs"
          Component={MuonBlog}
          auth={["Founder", "Investor"]}
          exact
        />
        <MainRoute
          path="/blogs/:id"
          Component={EachMuonBlogPost}
          auth={["Founder", "Investor"]}
          exact
        />
        {/* <MainRoute
          path="/blog/:id"
          Component={UserBlog}
          auth={["Founder", "Investor"]}
          exact
        /> */}
        <Route
          path="/reset-password/:email/:resetToken"
          component={ResetForgottenPassword}
          exact
        />
        <MainRoute
          path="/payment"
          Component={StripeContainer}
          // auth={["Founder"]}
          exact
        />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default AppRoute;
