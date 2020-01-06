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
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            type="submit"
            className="btn btn-primary text-uppercase "
            style={{
              backgroundColor: "#fad5c0",
              borderColor: "#fad5c0",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: "bold",
              boxShadow: "none"
            }}
          >
            Valider
          </button>
        </div>
      </form>
    </div>
  );
};
export default ForgotPassword;
