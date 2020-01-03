import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = event => {
    setEmail({ ...email, email: event.target.value });
  };
  const handleSubmit = event => {
    event.preventDefault();
  };
  return (
    <div className="forgot-password">
      <form>
        <div className="form-group">
          <label>Email</label>
          <input
            onChange={handleChange}
            type="email"
            className="form-control"
          ></input>
        </div>
        <button onClick={handleSubmit} className="btn btn-primary">
          S'inscrire
        </button>
      </form>
    </div>
  );
};
export default ForgotPassword;
