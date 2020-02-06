import React, { useEffect, useState, Fragment } from "react";
import queryString from "query-string";
import { verifyAccount } from "../../api/auth";
import { Redirect } from "react-router-dom";

const VerifyAccount = ({ location }) => {
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const values = queryString.parse(location.search);
    verifyAccount(values.uuid, abortController.signal)
      .then(data => {
        if (data.err) {
          setRedirect(true);
        } else {
          setRedirect(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [location]);

  const redirectUser = () => {
    if (redirect === true) {
      return <Redirect to="/login" />;
    } else if (redirect === false) {
      return (
        <div>
          Votre compte a été activé. Vous pouvez à présent
          <a href="/login">vous connecter</a>
        </div>
      );
    }
  };

  return <Fragment>{redirectUser()}</Fragment>;
};

export default VerifyAccount;
