import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/login/Login";
import MatchMe from "./components/match/MatchMe";
import Profile from "./components/profile/Profile";
import ProfileUser from "./components/profile/ProfileUser";
// import NavMenu from "./components/match/NavMenu";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/" exact component={Home}></Route>; */}
        <Route path="/login" exact component={Login}></Route>;
        <Route path="/match" exact component={MatchMe}></Route>;
        <Route path="/profileUser" exact component={ProfileUser}></Route>;
        <Route path="/profile" exact component={Profile}></Route>;
        {/* <Route path="/nav" exact component={NavMenu}></Route>; */}
        {/* 404 error page */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
