import React, { useEffect } from "react";
import queryString from "query-string";
import { verifyAccount } from "../../api/auth";

const VerifyAccount = ({ location }) => {
  useEffect(() => {
    const values = queryString.parse(location.search);
    verifyAccount(values.uuid)
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [location]);

  return <div>Verify account</div>;
};

export default VerifyAccount;
