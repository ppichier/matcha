import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/login/Login";
import MatchMe from "./components/match/MatchMe";
import Profile from "./components/profile/Profile";
import ProfileUser from "./components/profile/ProfileUser";
import VerifyAccount from "./components/login/VerifyAccount";
import PrivateRoute from "./components/auth/PrivateRoute";
// import NavMenu from "./components/match/NavMenu";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/" exact component={Home}></Route>; */}
        <Route path="/login" exact component={Login}></Route>;
        <PrivateRoute
          path="/profile/me"
          exact
          component={ProfileUser}
        ></PrivateRoute>
        {/* <PrivateRoute path="/profile" exact component={Profile}></PrivateRoute>; */}
        <PrivateRoute path="/profile" exact component={Profile}></PrivateRoute>;
        <PrivateRoute path="/match" exact component={MatchMe}></PrivateRoute>;
        <Route path="/verifyAccount" exact component={VerifyAccount}></Route>;
        {/* <Route path="/nav" exact component={NavMenu}></Route>; */}
        {/* 404 error page */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
