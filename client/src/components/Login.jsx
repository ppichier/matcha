import React, { useState } from "react";
import "./Login.css";
import { Container, Row, Col } from "react-bootstrap";
import Signup from "./Signup";
import Signin from "./Signin";
import ForgotPassword from "./ForgotPasword";

const Login = () => {
  const [isShow, setIsShow] = useState("signup");

  const handleShowSignUp = () => {
    setIsShow("signup");
    document.getElementById("signin-btn").classList.remove("active-btn");
    document.getElementById("signup-btn").classList.add("active-btn");
  };

  const handleShowSignIn = () => {
    setIsShow("signin");
    document.getElementById("signup-btn").classList.remove("active-btn");
    document.getElementById("signin-btn").classList.add("active-btn");
  };

  const forgotPassword = event => {
    event.preventDefault();
    setIsShow("passwordReset");
    document.getElementById("signup-btn").classList.remove("active-btn");
    document.getElementById("signin-btn").classList.remove("active-btn");
  };

  const sign = () => {
    if (isShow === "signup") {
      return <Signup />;
    } else if (isShow === "signin") {
      return <Signin forgotPassword={forgotPassword} />;
    } else if (isShow === "passwordReset") {
      return <ForgotPassword />;
    }
  };

  return (
    <div className="login-main text-muted">
      <Container>
        <Row>
          <Col></Col>
          <Col md={6}>
            <button
              id="signup-btn"
              className="login-btn btn btn-sm col-6 text-nowrap mb-4 font-weight-bold"
              onClick={handleShowSignUp}
            >
              S'enregistrer
            </button>
            <button
              id="signin-btn"
              className="login-btn btn btn-sm col-6 text-nowrap mb-4 font-weight-bold"
              onClick={handleShowSignIn}
            >
              Connexion
            </button>
            {sign()}
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
