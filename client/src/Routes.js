import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/" exact component={Home}></Route>; */}
        <Route path="/login" exact component={Login}></Route>;
        {/* <Route path="/profile" exact component={Profile}></Route>; */}
        {/* 404 error page */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
