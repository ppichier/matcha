import React, { useState } from "react";
// import { RecoverPassword } from "../../api/auth";
import { Redirect } from "react-router-dom";
import "./Signin.css";
import "./Login.css";
import { Container, Row, Col } from "react-bootstrap";
import queryString from "query-string";
import { recoverPassword } from "../../api/auth";
import { verifValitedPassword } from "../functions/utils";
import { Toast } from "react-bootstrap";

const RecoverPassword = ({ location, history }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    uuid: "",
    err: "",
    msg: "",
    redirect: false,
    showErrorToast: false,
    showSuccessToast: false
  });

  const parsed = queryString.parse(location.search);

  const handleChange = name => event => {
    const tmp = {
      ...values,
      [name]: event.target.value,
      uuid: parsed.uuid,
      showErrorToast: false,
      showSuccessToast: false
    };
    setValues(tmp);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const verif = verifValitedPassword(values);
    if (verif.err !== null) {
      setValues({
        ...values,
        err: verif.err,
        showErrorToast: true,
        showSuccessToast: false
      });
    } else {
      recoverPassword({
        email: values.email,
        password: values.password,
        uuid: values.uuid
      })
        .then(data => {
          if (data.err) {
            setValues({
              ...values,
              err: data.err,
              showErrorToast: true,
              showSuccessToast: false
            });
          } else {
            setValues({
              ...values,
              redirect: true,
              msg: data.msg,
              showErrorToast: false,
              showSuccessToast: true
            });
          }
        })
        .catch(err => console.log(err));
    }
  };

  const redirectUser = () => {
    if (values.redirect) {
      return <Redirect to="/login" />;
    }
  };

  const showError = () => {
    return (
      <Toast
        style={{ backgroundColor: "red", maxWidth: "none" }}
        animation
        onClose={() => setValues({ ...values, showErrorToast: false })}
        show={values.showErrorToast}
        className="mt-2"
      >
        <Toast.Header closeButton={false}>{values.err}</Toast.Header>
      </Toast>
    );
  };

  const showSuccess = () => {
    return (
      <Toast
        style={{ backgroundColor: "#63c7ac", maxWidth: "none" }}
        animation
        onClose={() => setValues({ ...values, showSuccessToast: false })}
        show={values.showSuccessToast}
        className="mt-2"
      >
        <Toast.Header closeButton={false}>{values.msg}</Toast.Header>
      </Toast>
    );
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
                ></input>
              </div>
              <div className="form-group">
                <label>Mot de passe</label>
                <input
                  onChange={handleChange("password")}
                  type="password"
                  className="form-control"
                  value={values.password}
                ></input>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block text-uppercase signin-btn"
              >
                Valider
              </button>
              {showError()}
              {showSuccess()}
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
