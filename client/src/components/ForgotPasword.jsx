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
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            onChange={handleChange}
            type="email"
            className="form-control"
          ></input>
        </div>
        <button
          type="submit"
          className="btn btn-primary text-uppercase "
          style={{
            backgroundColor: "#fad5c0",
            borderColor: "#fad5c0"
          }}
        >
          Valider
        </button>
      </form>
    </div>
  );
};
export default ForgotPassword;
