import React, { useState } from "react";
// import { RecoverPassword } from "../../api/auth";
import { Redirect } from "react-router-dom";
import "./Signin.css";
import "./Login.css";
import { Container, Row, Col } from "react-bootstrap";
import queryString from "query-string";

const RecoverPassword = ({ location }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    uuid: "",
    err: "",
    redirect: false
  });
  const parsed = queryString.parse(location.search);
  // console.log(parsed.hash);
  // // verifyAccount(url.uuid)
  const msg_error = () => {
    if (values.err) {
      return (
        <div className="alert alert-danger" role="alert">
          {values.err}
        </div>
      );
    }
  };
  const handleChange = name => event => {
    const tmp = { ...values, [name]: event.target.value, uuid: parsed.uuid };
    setValues(tmp);
  };

  const handleSubmit = event => {
    event.preventDefault();
    RecoverPassword({
      email: values.email,
      password: values.password,
      uuid: values.uuid
    })
      .then(data => {
        if (data.err) {
          setValues({ ...values, err: data.err });
        } else {
          // set jwt on localstorage sent by the server
          // redirect to /login or /discover
          setValues({ ...values, redirect: true });
        }
      })
      .catch(err => console.log(err));
  };

  const redirectUser = () => {
    if (values.redirect) {
      // and check valid token ??
      // fake loader ??
      return <Redirect to="/login" />;
    }
  };

  return (
    <div className="signin text-muted">
      <Container className="login-container">
        <Row>
          <Col></Col>
          <Col md={6} className="py-5">
            <form>
              <h4 style={{ justifyContent: "center", display: "flex" }}>
                Nouveau mot de passe
              </h4>
              <div className="form-group">
                <label>Email</label>
                <input
                  onChange={handleChange("pseudo")}
                  type="text"
                  className="form-control"
                  value={values.pseudo}
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
              {msg_error()}
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
