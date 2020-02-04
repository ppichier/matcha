import React, { useState } from "react";
import { signup } from "../../api/auth";
import { Toast } from "react-bootstrap";
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

  console.log(values.err);

  const verifValited = () => {
    let rgxpassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[&#($_);.+\-!])/;
    let rgxmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let i = values.password.length;

    if (i < 6) {
      const tmp = {
        ...values,
        err: "Le mot de passe doit etre composé d'au moins 6 caractères."
      };
      setValues(tmp);
      return 1;
    } else if (!rgxpassword.test(values.password)) {
      const tmp = {
        ...values,
        err:
          " votre mot de passe doit figurer au moins un chiffre, une majuscule et un caractère spécial."
      };
      setValues(tmp);
      return 1;
    } else if (!rgxmail.test(values.email)) {
      const tmp = { ...values, err: "votre adresse email n'est pas valide." };
      setValues(tmp);
      return 1;
    }
    return 0;
  };
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
    if (verifValited() === 0) {
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
            // console.log(data);
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
        .catch(err => console.log(err));
    }
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

  const msg_error = () => {
    console.log("je rentre");
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
        {msg_error()}
      </form>
      {/* {JSON.stringify(values)} */}
    </div>
  );
};

export default Signup;
