import React, { useState } from "react";
import { forgotPassword } from "../../api/auth";

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: "",
    err: "",
    msg: ""
  });
  const msg_error = () => {
    if (values.err) {
      return (
        <div className="alert alert-danger" role="alert">
          {values.err}
        </div>
      );
    } else if (values.msg) {
      return (
        <div className="alert alert-success" role="alert">
          {values.msg}
        </div>
      );
    }
  };
  const handleChange = event => {
    setValues({ ...values, email: event.target.value });
  };
  const handleSubmit = event => {
    event.preventDefault();
    forgotPassword({
      email: values.email
    })
      .then(data => {
        if (data.err) {
          setValues({ ...values, err: data.err });
        } else if (data.msg) {
          setValues({
            ...values,
            email: "",
            err: "",
            msg: data.msg
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
          {msg_error()}
        </div>
      </form>
    </div>
  );
};
export default ForgotPassword;
