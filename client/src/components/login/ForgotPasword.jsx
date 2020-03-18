import React, { useState } from "react";
import "./ForgotPassword.css";
import { forgotPassword } from "../../api/auth";
import { Toast } from "react-bootstrap";
import { verifValidatedEmail } from "../functions/utils";

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: "",
    err: "",
    msg: "",
    showErrorToast: false,
    showSuccessToast: false
  });

  const showError = () => {
    return (
      <Toast
        style={{ backgroundColor: "red", maxWidth: "none" }}
        animation
        onClose={() => setValues({ ...values, showErrorToast: false })}
        show={values.showErrorToast}
        className="mt-2"
      >
        <Toast.Header closeButton={false}>{values.err}</Toast.Header>
      </Toast>
    );
  };

  const showSuccess = () => {
    return (
      <Toast
        style={{ backgroundColor: "#63c7ac", maxWidth: "none" }}
        animation
        onClose={() => setValues({ ...values, showSuccessToast: false })}
        show={values.showSuccessToast}
        className="mt-2"
      >
        <Toast.Header closeButton={false}>{values.msg}</Toast.Header>
      </Toast>
    );
  };

  const handleChange = event => {
    setValues({
      ...values,
      email: event.target.value,
      showSuccessToast: false,
      showErrorToast: false
    });
  };
  const handleSubmit = event => {
    event.preventDefault();
    const verif = verifValidatedEmail(values.email);
    if (verif.err !== null) {
      setValues({
        ...values,
        err: verif.err,
        showErrorToast: true,
        showSuccessToast: false
      });
    } else {
      forgotPassword({
        email: values.email
      })
        .then(data => {
          if (!data) {
            console.error("Server down");
            return;
          }
          if (data.err) {
            setValues({
              ...values,
              err: data.err,
              showErrorToast: true,
              showSuccessToast: false
            });
          } else if (data.msg) {
            setValues({
              ...values,
              email: "",
              err: "",
              msg: data.msg,
              showErrorToast: false,
              showSuccessToast: true
            });
          }
        })
        .catch(err => console.log(err));
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
        {showSuccess()}
        {showError()}
      </form>
    </div>
  );
};
export default ForgotPassword;
