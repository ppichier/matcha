import React, { useState } from "react";
import { signup } from "../../api/auth";
import { Toast } from "react-bootstrap";
import { verifValited } from "../functions/utils";
import "./Signup.css";

const Signup = () => {
  const [values, setValues] = useState({
    email: "",
    pseudo: "",
    firstName: "",
    lastName: "",
    password: "",
    err: "",
    msg: "",
    success: false,
    showErrorToast: false,
    showSuccessToast: false
  });

  const handleChange = name => event => {
    const tmp = {
      ...values,
      [name]: event.target.value,
      showSuccessToast: false,
      showErrorToast: false
    };
    setValues(tmp);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const verif = verifValited(values);
    if (verif.err !== null) {
      setValues({
        ...values,
        err: verif.err,
        success: false,
        showErrorToast: true,
        showSuccessToast: false
      });
    } else {
      signup({
        email: values.email,
        pseudo: values.pseudo,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password
      })
        .then(data => {
          if (data.err) {
            setValues({
              ...values,
              err: data.err,
              success: false,
              showErrorToast: true,
              showSuccessToast: false
            });
          } else {
            setValues({
              ...values,
              pseudo: "",
              firstName: "",
              lastName: "",
              password: "",
              err: "",
              msg: data.msg,
              success: true,
              emailConfirm: values.email,
              email: "",
              showSuccessToast: true,
              showErrorToast: false
            });
          }
        })
        .catch(err => console.log(values.err));
    }
  };

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

  return (
    <div className="signup">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            value={values.email}
            required
          />
        </div>
        <div className="form-group">
          <label>Pseudo</label>
          <input
            onChange={handleChange("pseudo")}
            type="text"
            className="form-control"
            value={values.pseudo}
            required
          />
        </div>
        <div className="form-group">
          <label>Nom</label>
          <input
            onChange={handleChange("firstName")}
            type="text"
            className="form-control"
            value={values.firstName}
            required
          />
        </div>
        <div className="form-group">
          <label>Prénom</label>
          <input
            onChange={handleChange("lastName")}
            type="text"
            className="form-control"
            value={values.lastName}
            required
          />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            value={values.password}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary  mt-5 btn-block text-uppercase signup-btn"
        >
          S'inscrire
        </button>
        {showSuccess()}
        {showError()}
      </form>
      {/* {JSON.stringify(values)} */}
    </div>
  );
};

export default Signup;
