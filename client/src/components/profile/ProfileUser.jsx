import React, { useState, Fragment } from "react";
import NavbarHeader from "../navbar/Navbar";
import Picture from "./Picture";
import CardPicture from "./CardPicture";
import { Row, Col, Form, Button, Container, Toast } from "react-bootstrap";
import { profileUser } from "../../api/";
import ProgressBar from "react-bootstrap/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { verifValited } from "../fonctions/utils";
import "./ProfileUser.css";

const ProfileUser = props => {
  const [values, setValues] = useState({
    myTags: [],
    commonTags: [],
    email: "",
    pseudo: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    newPassword: "",
    oldPassword: "",
    gender: "",
    sexualPreference: "",
    description: "",
    userSize: "",
    width: 0,
    err: "",
    success: false,
    showErrorToast: false,
    showSuccessToast: true
  });
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
  const handleChange = name => event => {
    const tmp = {
      ...values,
      [name]: event.target.value
    };
    setValues(tmp);
  };

  const udpateProgressBar = () => {
    const elements = [
      "pseudo",
      "email",
      "firstName",
      "lastName",
      "dateOfBirth",
      "gender",
      "sexualPreference"
    ];

    let width = 0;
    for (const element of elements) {
      if (values[element].length !== 0) {
        width += 10;
      }
    }
    //if //myTags.length != 0
    setValues({ ...values, width: width });
  };

  const handlePress = event => {
    if (event.key === "Enter") {
      event.preventDefault();
      const tmp = { ...values, myTags: [...values.myTags, event.target.value] };
      setValues(tmp);
    }
  };

  const handleDeleteTag = i => () => {
    const tab = [...values.myTags];
    tab.splice(i, 1);
    setValues({ ...values, myTags: tab });
  };
  const handleSubmit = event => {
    const verif = verifValited(values);
    if (verif.err !== null) {
      setValues({ ...values, err: verif.err });
    } else {
      profileUser({
        myTags: values.myTags,
        email: values.email,
        pseudo: values.pseudo,
        firstName: values.firstName,
        lastName: values.lastName,
        dateOfBirth: values.dateOfBirth,
        newPassword: values.newPassword,
        oldPassword: values.oldPassword,
        gender: values.gender,
        sexualPreference: values.sexualPreference,
        description: values.description,
        adress: values.adress,
        city: values.city,
        postalCode: values.postalCode
      })
        .then(data => {
          if (data.err) {
            setValues({ ...values, err: data.err });
          } else {
            setValues({
              ...values,
              err: "",
              success: true,
              showSuccessToast: true,
              showErrorToast: false
            });
            // redirect to /profile or /discover
          }
        })
        .catch(err => console.log(err));
    }
  };
  return (
    <Fragment>
      <NavbarHeader />
      <Container>
        <Row style={{ flexWrap: "wrap" }}>
          <Col md={4} className="mt-5 ">
            <Row>
              <Col>
                <Row className="row-pictureProfile">
                  <CardPicture
                    pseudo={values.pseudo}
                    lastName={values.lastName}
                    city={values.city}
                    birthday={values.dateOfBirth}
                  />
                </Row>
                <Row
                  className="Row mt-4 py-3"
                  style={{ justifyContent: "center" }}
                >
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Activer la localisation"
                  />
                </Row>
              </Col>
            </Row>
          </Col>
          <Col md={8} className="pl-5">
            <Row className="mt-5 mb-1 row-picture">
              <Picture />
            </Row>
            <Row className="pt-4 row-infos">
              <Col>
                <Row className="mb-4 pt-3 pb-3 Row">
                  <Col>
                    <Form>
                      <Form.Row>
                        <Form.Group as={Col} md="4">
                          <Form.Label>Nom</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Nom"
                            onChange={handleChange("firstName")}
                            onBlur={udpateProgressBar}
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                          <Form.Label>Prenom</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Prenom"
                            onChange={handleChange("lastName")}
                            onBlur={udpateProgressBar}
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                          <Form.Label>Pseudo</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Pseudo"
                            onChange={handleChange("pseudo")}
                            onBlur={udpateProgressBar}
                          ></Form.Control>
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col} md="6">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Email"
                            onChange={handleChange("email")}
                            onBlur={udpateProgressBar}
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                          <Form.Label>Date de naissance</Form.Label>
                          <Form.Control
                            type="date"
                            placeholder="date de naissance"
                            name="date"
                            onChange={handleChange("dateOfBirth")}
                            onBlur={udpateProgressBar}
                          ></Form.Control>
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col} md="6">
                          <Form.Label>Ancien Mot de Passe</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Ancien mot de passe"
                            onChange={handleChange("oldPassword")}
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                          <Form.Label>Nouveau Mot de Passe</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Nouveau Mot de Passe"
                            onChange={handleChange("newPassword")}
                          ></Form.Control>
                        </Form.Group>
                      </Form.Row>
                    </Form>
                  </Col>
                </Row>
                <Row className="mb-4 pt-3 pb-3 Row">
                  <Col>
                    <Form>
                      <Form.Row>
                        <Form.Group as={Col} md="6">
                          <Form.Label>Je suis </Form.Label>
                          <Form.Control
                            as="select"
                            onChange={handleChange("gender")}
                            onBlur={udpateProgressBar}
                          >
                            <option value=""> Séléctionnez un genre</option>
                            <option value="M"> Un Homme </option>
                            <option value="F"> Une Femme </option>
                            <option value="TF"> une Transféminine</option>
                            <option value="TH"> une Transmasculin</option>
                            <option value="B">Bigenre</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                          <Form.Label>Je cherche </Form.Label>
                          <Form.Control
                            as="select"
                            onChange={handleChange("sexualPreference")}
                            onBlur={udpateProgressBar}
                          >
                            <option value=""> Séléctionnez un genre</option>
                            <option value="M"> Un Homme </option>
                            <option value="F"> Une Femme </option>
                            <option value="TF"> une Transféminine</option>
                            <option value="TH"> une Transmasculin</option>
                            <option value="B">Bigenre</option>
                          </Form.Control>
                        </Form.Group>
                      </Form.Row>
                      <Form.Group md="12">
                        <Form.Label>Taille</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="1.67"
                          name="userSize"
                          onChange={handleChange("adress")}
                          onBlur={udpateProgressBar}
                        />
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
                <Row className="mb-4 pt-3 pb-3 Row">
                  <Col>
                    <Form>
                      <Form.Group
                        controlId="exampleForm.ControlTextarea1"
                        md="12"
                      >
                        <Form.Label>
                          Veuillez sélectionner vos intérêts :
                        </Form.Label>
                        <Row>
                          <Col>
                            <Form.Check
                              type="checkbox"
                              id="musique"
                              label="Musique"
                              name="commonTags"
                            />
                          </Col>
                          <Col>
                            <Form.Check
                              type="checkbox"
                              id="musique"
                              label="Musique"
                              name="commonTags"
                            />
                          </Col>
                          <Col>
                            <Form.Check
                              type="checkbox"
                              id="musique"
                              label="Musique"
                              name="commonTags"
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Centres d'intérêt</Form.Label>
                        <Form.Control
                          onKeyPress={handlePress}
                          type="text"
                          placeholder="Tags"
                          name="myTags"
                        />
                        <div className="mytags-main mt-2">
                          {values.myTags.map((tag, i) => {
                            return (
                              <div className="mytags mr-2 pl-2 mt-2" key={i}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: "#" + tag
                                  }}
                                />

                                <FontAwesomeIcon
                                  icon={faTrashAlt}
                                  className=" mx-2 mytags-delete"
                                  onClick={handleDeleteTag(i)}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
                <Row className="mb-4 pt-3 pb-3 Row">
                  <Col>
                    <Form>
                      <Form.Group
                        controlId="exampleForm.ControlTextarea1"
                        md="12"
                      >
                        <Form.Label>A propos de vous</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows="4"
                          placeholder="A propos de vous"
                          name="bio"
                          onChange={handleChange("description")}
                          onBlur={udpateProgressBar}
                        />
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
                <Row className="mb-4 pt-3 pb-3 Row">
                  <Col>
                    <Form>
                      <ProgressBar
                        striped
                        variant="info"
                        label={values.width}
                        now={values.width}
                        max={100}
                      />
                    </Form>
                  </Col>
                </Row>
                <Button
                  onClick={() => handleSubmit(values)}
                  className=" mb-5 btn-primary  btn-block text-uppercase profile-btn"
                >
                  Valider
                </Button>
                {showError()}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default ProfileUser;
