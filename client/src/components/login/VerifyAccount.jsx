import React, { useEffect, useState, Fragment } from "react";
import queryString from "query-string";
import { verifyAccount } from "../../api/auth";
import { Redirect } from "react-router-dom";
import { notificationAlert } from "../functions/notification";
import imageAccount from "../../images/verifyAccount.png";

const VerifyAccount = ({ location }) => {
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const values = queryString.parse(location.search);
    verifyAccount(values.uuid, abortController.signal)
      .then((data) => {
        if (!data) {
          notificationAlert("Server down", "danger", "bottom-center");
        }
        if (data.err) {
          setRedirect(true);
        } else {
          setRedirect(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location]);

  const redirectUser = () => {
    if (redirect === true) {
      return <Redirect to="/login" />;
    } else if (redirect === false) {
      return (
        <div>
          <img
            style={{ marginLeft: "40%", paddingTop: "10%"}}
            alt="connection"
            src={imageAccount}
         />
          <a href="/login">connecter</a>
        </div>
      );
    }
  };

  return <Fragment>{redirectUser()}</Fragment>;
};

export default VerifyAccount;
