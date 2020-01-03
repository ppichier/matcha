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
      <form>
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
        <button onClick={handleSubmit} className="btn btn-primary">
          S'inscrire
        </button>
        <button onClick={forgotPassword}>Forgot Password?</button>{" "}
        {/* TODO // Change style of button to look like a link */}
      </form>
      {JSON.stringify(values)}
    </div>
  );
};

export default Signin;
