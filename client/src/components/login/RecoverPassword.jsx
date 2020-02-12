import React, { useState } from "react";
// import { RecoverPassword } from "../../api/auth";
import { Redirect } from "react-router-dom";
import "./Signin.css";
import "./Login.css";
import { Container, Row, Col } from "react-bootstrap";
import queryString from "query-string";
import { recoverPassword } from "../../api/auth";

const RecoverPassword = ({ location }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    uuid: "",
    err: "",
    redirect: false
  });
  const verifValited = () => {
    let rgxpassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[&#($_);.+\-!])/;
    let lenPassword = values.password.length;
    if (lenPassword < 6 && lenPassword > 30) {
      const tmp = {
        ...values,
        err: "Le code d'accès doit etre composé min de 6 caractères et max 30 "
      };
      setValues(tmp);
      return 1;
    } else if (!rgxpassword.test(values.password)) {
      const tmp = {
        ...values,
        err:
          " votre mot de passe doit figurer au moins un chiffre, une majuscule et un caractère spécial.."
      };
      setValues(tmp);
      return 1;
    }
    return 0;
  };

  const parsed = queryString.parse(location.search);
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
    if (verifValited() === 0) {
      recoverPassword({
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
    }
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
