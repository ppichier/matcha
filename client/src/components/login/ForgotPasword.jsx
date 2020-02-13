import React, { useState } from "react";
import { forgotPassword } from "../../api/auth";
import { Toast } from "react-bootstrap";

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
    forgotPassword({
      email: values.email
    })
      .then(data => {
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
            values={values.msg}
          ></input>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            type="submit"
            className="btn btn-primary text-uppercase "
            style={{
              backgroundColor: "#fad5c0",
              borderColor: "#fad5c0",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: "bold",
              boxShadow: "none"
            }}
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
