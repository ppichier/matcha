import React, { useState } from "react";
import { signup } from "../api/auth";
import "./Signup.css";

const Signup = () => {
  const [values, setValues] = useState({
    email: "",
    pseudo: "",
    firstName: "",
    lastName: "",
    password: "",
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
  const handleChange = name => event => {
    const tmp = { ...values, [name]: event.target.value };
    setValues(tmp);
  };

  const handleSubmit = event => {
    event.preventDefault();
    signup({
      email: values.email,
      pseudo: values.pseudo,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password
    })
      .then(data => {
        if (data.err) {
          setValues({ ...values, err: data.err });
        } else if (data.msg) {
          setValues({
            ...values,
            email: "",
            pseudo: "",
            firstName: "",
            lastName: "",
            password: "",
            err: "",
            msg: data.msg
          });
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <div className="signup">
      <form>
        <div className="form-group">
          <label>Email</label>
          <input
            onChange={handleChange("email")}
            type="email"
            className="form-control"
          ></input>
        </div>
        <div className="form-group">
          <label>Pseudo</label>
          <input
            onChange={handleChange("pseudo")}
            type="text"
            className="form-control"
          ></input>
        </div>
        <div className="form-group">
          <label>Nom</label>
          <input
            onChange={handleChange("firstName")}
            type="text"
            className="form-control"
          ></input>
        </div>
        <div className="form-group">
          <label>Prenom</label>
          <input
            onChange={handleChange("lastName")}
            type="text"
            className="form-control"
          ></input>
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            onChange={handleChange("password")}
            type="password"
            className="form-control"
          ></input>
        </div>
        <button onClick={handleSubmit} className="btn btn-primary">
          S'inscrire
        </button>
        {msg_error()}
      </form>
      {JSON.stringify(values)}
    </div>
  );
};

export default Signup;
