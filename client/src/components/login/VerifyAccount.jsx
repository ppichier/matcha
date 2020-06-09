import React, { useEffect, useState, Fragment } from "react";
import queryString from "query-string";
import { verifyAccount } from "../../api/auth";
import { Redirect } from "react-router-dom";
import { notificationAlert } from "../functions/notification";
import imageAccount from "../../images/verifsAccount.jpg";
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
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img alt="connection" src={imageAccount} style={{ width: "50%" }} />
          </div>
          <div>
            <a
              style={{ color: "#55E4B6", fontSize: "3vw", fontWeight: "bold" }}
              href="/login"
            >
              Se connecter
            </a>
          </div>
        </div>
      );
    }
  };
  return <Fragment>{redirectUser()}</Fragment>;
};
export default VerifyAccount;
