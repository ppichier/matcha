import React, { useState } from "react";
import "./Login.css";
// import { Container, Row, Col } from "react-bootstrap";
import Signup from "./Signup";
import Signin from "./Signin";
import ForgotPassword from "./ForgotPasword";

const Login = () => {
  const [isShow, setIsShow] = useState("signup");

  const handleShowSignUp = () => {
    setIsShow("signup");
  };

  const handleShowSignIn = () => {
    setIsShow("signin");
  };

  const forgotPassword = event => {
    event.preventDefault();
    setIsShow("passwordReset");
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
    <div className="container column-md-8 offset-md-auto">
      <button onClick={handleShowSignUp}>Sign up</button>
      <button onClick={handleShowSignIn}>Sign in</button>
      {sign()}
    </div>
  );
};

export default Login;
