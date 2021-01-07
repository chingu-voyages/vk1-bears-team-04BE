import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ActivationEmail from "./auth/ActivationEmail";
import NotFound from "../utils/NotFound/NotFound";

import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";

import Profile from "../body/profile/Profile";
import EditUser from "../body/profile/EditUser";

import { useSelector } from "react-redux";

import { About, Contact, Features, Faqs, Home, Privacy, Terms } from "./static";

import { Account, Dashboard, Hotlines, Maps } from "./views";

const Body = () => {
  const auth = useSelector(state => state.auth);
  const { isLogged, isAdmin } = auth;
  return (
    <section>
      <Switch>
        <Route path="/login" component={isLogged ? NotFound : Login} exact />
        <Route
          path="/register"
          component={isLogged ? NotFound : Register}
          exact
        />

        <Route
          path="/forgot_password"
          component={isLogged ? NotFound : ForgotPassword}
          exact
        />
        <Route
          path="/user/reset/:token"
          component={isLogged ? NotFound : ResetPassword}
          exact
        />

        <Route
          path="/user/activate/:activation_token"
          component={ActivationEmail}
          exact
        />

        <Route
          path="/profile"
          component={isLogged ? Profile : NotFound}
          exact
        />
        <Route
          path="/edit_user/:id"
          component={isAdmin ? EditUser : NotFound}
          exact
        />

        <Route exact path="/" component={Home} />
        <Route path="/about-us" component={About} />
        <Route path="/features" component={Features} />
        <Route path="/contact" component={Contact} />
        <Route path="/faqs" component={Faqs} />
        <Route path="/privacy-policy" component={Privacy} />
        <Route path="/terms-of-services" component={Terms} />

        <Route path="/account" component={Account} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/maps" component={Maps} />
        <Route path="/hotlines" component={Hotlines} />
      </Switch>
    </section>
  );
};

export default Body;
