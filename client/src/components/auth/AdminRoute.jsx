import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAdmin } from "../../api/admin";
import CustomSpinner from "./Spinner";

const PrivateRoute = ({ component: Component, socket, ...rest }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (typeof window != "undefined") {
      if (localStorage.getItem("jwt")) {
        isAdmin()
          .then((data) => {
            if (!data) {
              console.error("Server down");
              return;
            } else if (data && data.auth) {
              setAuth(true);
            }
            setLoading(false);
          })
          .catch((err) => console.log(err));
      } else {
        setLoading(false);
      }
    }
  }, []);

  if (loading) {
    return <CustomSpinner />;
  } else if (auth) {
    return (
      <Route
        {...rest}
        render={(props) => <Component {...props} socket={socket} />}
      />
    );
  } else {
    return (
      <Route
        {...rest}
        render={(props) => (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )}
      />
    );
  }
};

export default PrivateRoute;
