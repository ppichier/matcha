import React, { useState } from "react";
import "./ForgotPassword.css";
import { forgotPassword } from "../../api/auth";
import { verifValidatedEmail } from "../functions/utils";
import { notificationAlert } from "../functions/notification";

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      email: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const verif = verifValidatedEmail(values.email);
    if (verif.err !== null) {
      notificationAlert(verif.err, "danger", "bottom-center");
    } else {
      forgotPassword({
        email: values.email,
      })
        .then((data) => {
          if (!data) {
            notificationAlert("Server down", "danger", "bottom-center");
          } else if (data.err) {
            notificationAlert(data.err, "danger", "bottom-center");
          } else if (data.msg) {
            notificationAlert(data.msg, "success", "bottom-center");
            setValues({
              ...values,
              email: "",
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="forgot-password">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            onChange={handleChange}
            type="email"
            className="form-control"
            value={values.email}
            required
            autoComplete="on"
          ></input>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            type="submit"
            className="btn btn-primary text-uppercase forget-btn"
          >
            Valider
          </button>
        </div>
      </form>
    </div>
  );
};
export default ForgotPassword;
