import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../api/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (typeof window != "undefined") {
      if (localStorage.getItem("jwt")) {
        isAuthenticated()
          .then(data => {
            console.log(data);
            if (data.auth) {
              setAuth(true);
            }
            setLoading(false);
          })
          .catch(err => console.log(err));
      } else {
        setLoading(false);
      }
    }
  }, []);

  // const isAuth = await isAuthenticated();

  if (loading) {
    return <div>Pending...</div>;
  } else if (auth) {
    return <Route {...rest} render={props => <Component {...props} />} />;
  } else {
    return (
      <Route
        {...rest}
        render={props => (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )}
      />
    );
  }
};

export default PrivateRoute;
