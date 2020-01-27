import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/login/Login";
import NavbarHeader from "./components/navbar/Navbar";
import Profile from "./components/profile/Profile";
import ProfileUser from "./components/profile/ProfileUser";
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/" exact component={Home}></Route>; */}
        <Route path="/login" exact component={Login}></Route>;
        <Route path="/navbar" exact component={NavbarHeader}></Route>;
        <Route path="/profileUser" exact component={ProfileUser}></Route>;
        <Route path="/profile" exact component={Profile}></Route>;
        {/* 404 error page */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
