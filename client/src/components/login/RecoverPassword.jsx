import React, { useState } from "react";
// import { RecoverPassword } from "../../api/auth";
import { Redirect } from "react-router-dom";
import "./Signin.css";
import "./Login.css";
import { Container, Row, Col } from "react-bootstrap";
import queryString from "query-string";
import { recoverPassword } from "../../api/auth";
import {
  verifValidatedPassword,
  verifValidatedEmail,
} from "../functions/utils";
import { notificationAlert } from "../functions/notification";

const RecoverPassword = ({ location, history }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    uuid: "",
    redirect: false,
  });

  const parsed = queryString.parse(location.search);

  const handleChange = (name) => (event) => {
    const tmp = {
      ...values,
      [name]: event.target.value,
      uuid: parsed.uuid,
    };
    setValues(tmp);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const verifPassword = verifValidatedPassword(values.password);
    const verifEmail = verifValidatedEmail(values.email);
    let error;
    if (verifPassword.err !== null && verifEmail !== null) {
      if (verifPassword.err !== null) {
        error = verifPassword.err;
      } else error = verifValidatedEmail.err;
      notificationAlert(error, "danger", "bottom-center");
    } else {
      recoverPassword({
        email: values.email,
        password: values.password,
        uuid: values.uuid,
      })
        .then((data) => {
          if (!data) {
            notificationAlert("Server down", "danger", "bottom-center");
            return;
          }
          if (data.err) {
            notificationAlert(data.err, "danger", "bottom-center");
          } else {
            setValues({
              ...values,
              redirect: true,
            });
            notificationAlert(data.msg, "success", "bottom-center");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const redirectUser = () => {
    if (values.redirect) {
      return <Redirect to="/login" />;
    }
  };

  return (
    <div className="signin text-muted">
      <Container className="login-container">
        <Row>
          <Col></Col>
          <Col md={6} className="py-5">
            <form onSubmit={handleSubmit}>
              <h4 style={{ justifyContent: "center", display: "flex" }}>
                Nouveau mot de passe
              </h4>
              <div className="form-group">
                <label>Email</label>
                <input
                  onChange={handleChange("email")}
                  type="email"
                  className="form-control"
                  value={values.email}
                  required
                  autoComplete="on"
                ></input>
              </div>
              <div className="form-group">
                <label>Mot de passe</label>
                <input
                  onChange={handleChange("password")}
                  type="password"
                  className="form-control"
                  value={values.password}
                  required
                  autoComplete="on"
                ></input>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block text-uppercase signin-btn"
              >
                Valider
              </button>
              {redirectUser()}
            </form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default RecoverPassword;
