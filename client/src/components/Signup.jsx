import React, { useState } from "react";
import "./Signup.css";

const Signup = () => {
  const [values, setValues] = useState({
    email: "",
    pseudo: "",
    firstName: "",
    lastName: "",
    password: ""
  });

  const handleChange = event => {
    const tmp = { ...values, email: event.target.value };
    setValues(tmp);
  };

  const handleSubmit = event => {
    event.preventDefault();
  };
  return (
    <div className="signup">
      <form>
        <div className="form-group">
          <label>Email</label>
          <input
            onChange={handleChange}
            type="email"
            className="form-control"
          ></input>
        </div>
        <div className="form-group">
          <label>Pseudo</label>
          <input
            onChange={handleChange}
            type="text"
            className="form-control"
          ></input>
        </div>
        <div className="form-group">
          <label>Nom</label>
          <input
            onChange={handleChange}
            type="text"
            className="form-control"
          ></input>
        </div>
        <div className="form-group">
          <label>Prenom</label>
          <input
            onChange={handleChange}
            type="text"
            className="form-control"
          ></input>
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            onChange={handleChange}
            type="password"
            className="form-control"
          ></input>
        </div>
        <button onClick={handleSubmit} className="btn btn-primary">
          S'inscrire
        </button>
      </form>
      {JSON.stringify(values)}
    </div>
  );
};

export default Signup;
