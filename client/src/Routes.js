import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/login/Login";
import MatchMe from "./components/match/MatchMe";
import Profile from "./components/profile/Profile";
import ProfileUser from "./components/profile/ProfileUser";
import VerifyAccount from "./components/login/VerifyAccount";
import RecoverPassword from "./components/login/RecoverPassword";
import PrivateRoute from "./components/auth/PrivateRoute";
import NotFound from "./components/404/NotFound";
import CustomRoute from "./components/auth/CustomRoute";
// import NavMenu from "./components/match/NavMenu";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <CustomRoute path="/" exact></CustomRoute>
        <Route path="/login" exact component={Login}></Route>;
        <PrivateRoute
          path="/profile/me"
          exact
          component={ProfileUser}
        ></PrivateRoute>
        <PrivateRoute path="/profile" exact component={Profile}></PrivateRoute>;
        <PrivateRoute path="/match" exact component={MatchMe}></PrivateRoute>;
        <Route path="/verifyAccount" exact component={VerifyAccount}></Route>;
        <Route
          path="/recoverPassword"
          exact
          component={RecoverPassword}
        ></Route>
        ;{/* <Route path="/nav" exact component={NavMenu}></Route>; */}
        <Route path="" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
