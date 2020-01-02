import React, { useState } from "react";
import "./Login.css";
import { Container, Row, Col } from "react-bootstrap";
import Signup from "./Signup";
import Signin from "./Signin";

const Login = () => {
  const [isShow, setIsShow] = useState("signup");

  const handleShowSignUp = () => {
    setIsShow("signup");
  };

  const handleShowSignIn = () => {
    setIsShow("signin");
  };

  const sign = () => {
    if (isShow === "signup") {
      return <Signup />;
    } else {
      return <Signin />;
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
