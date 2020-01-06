import React, { useState } from "react";
import "./Signin.css";

const Signin = ({ forgotPassword }) => {
  const [values, setValues] = useState({
    pseudo: "",
    password: "",
    redirect: false
  });

  const handleChange = name => event => {
    const tmp = { ...values, [name]: event.target.value };
    setValues(tmp);
  };

  const handleSubmit = event => {
    event.preventDefault();
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
        <button
          type="submit"
          className="btn btn-primary mt-5  btn-block text-uppercase signin-btn"
        >
          S'inscrire
        </button>
        <button
          className="btn btn-link btn-block mt-4"
          onClick={forgotPassword}
        >
          Mot de passe oublie?
        </button>{" "}
        {/* TODO ERROR // Error msg forgot password then return browser */}
      </form>
    </div>
  );
};

export default Signin;
