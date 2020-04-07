import React, { useState } from "react";
import { signup } from "../../api/auth";
import { verifValidated, verifValidatedPassword } from "../functions/utils";
import "./Signup.css";
import { notificationAlert } from "../functions/notification";

const Signup = () => {
  const [values, setValues] = useState({
    email: "",
    pseudo: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const handleChange = (name) => (event) => {
    const tmp = {
      ...values,
      [name]: event.target.value,
    };
    setValues(tmp);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const verif = verifValidated(values);
    const verifPassword = verifValidatedPassword(values.password);
    let error = "";
    if (verif.err !== null || verifPassword.err != null) {
      if (verifPassword.err != null) error = verifPassword.err;
      else error = verif.err;
      notificationAlert(error, "danger", "bottom-center");
    } else {
      signup({
        email: values.email,
        pseudo: values.pseudo,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
      })
        .then((data) => {
          if (!data) {
            notificationAlert("Server down", "danger", "bottom-center");
            return;
          } else if (data.err) {
            notificationAlert(data.err, "danger", "bottom-center");
          } else {
            notificationAlert(data.msg, "success", "bottom-center");
            setValues({
              ...values,
              pseudo: "",
              firstName: "",
              lastName: "",
              password: "",
              emailConfirm: values.email,
              email: "",
            });
          }
        })
        .catch((err) => console.log(values.err));
    }
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
            autoComplete="on"
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
            autoComplete="on"
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
            autoComplete="on"
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
            autoComplete="on"
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
            autoComplete="on"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary  mt-5 btn-block text-uppercase signup-btn"
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default Signup;
