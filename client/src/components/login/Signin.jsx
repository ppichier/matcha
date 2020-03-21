import React, { useState } from "react";
import { signin } from "../../api/auth";
import { Redirect } from "react-router-dom";
import "./Signin.css";

const Signin = ({ forgotPassword }) => {
  const [values, setValues] = useState({
    pseudo: "",
    password: "",
    err: "",
    redirect: false
  });
  const msg_error = () => {
    if (values.err) {
      return (
        <div className="alert alert-danger" role="alert">
          {values.err}
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
    signin({
      pseudo: values.pseudo,
      password: values.password
    })
      .then(data => {
        if (!data) {
          console.error("Server down");
          return;
        } else if (data.err) {
          setValues({ ...values, err: data.err });
        } else {
          // set jwt on localstorage sent by the server
          // redirect to /profile or /discover
          if (typeof window !== "undefined") {
            localStorage.setItem("jwt", JSON.stringify(data));
          } else {
            console.error("Failed to save in local storage");
          }
          setValues({ ...values, redirect: true });
        }
      })
      .catch(err => console.log(err));
  };

  const redirectUser = () => {
    if (values.redirect) {
      // and check valid token ??
      // fake loader ??
      return <Redirect to="/profile/me" />;
    }
  };

  return (
    <div className="signin">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Pseudo</label>
          <input
            onChange={handleChange("pseudo")}
            type="text"
            className="form-control"
            value={values.pseudo}
          ></input>
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            value={values.password}
          ></input>
        </div>
        <button
          type="submit"
          className="btn btn-primary  mt-5  btn-block text-uppercase signin-btn"
        >
          Se connecter
        </button>
        <button
          className="btn btn-link btn-block mt-4 text-dark"
          onClick={forgotPassword}
        >
          Mot de passe oublié?
        </button>
        {msg_error()}
        {redirectUser()}
      </form>
    </div>
  );
};

export default Signin;
