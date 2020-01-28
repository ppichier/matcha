import React, { useState, Fragment } from "react";
import NavbarHeader from "../navbar/Navbar";
import Picture from "./Picture";
import CardPicture from "./CardPicture";
import { Row, Col, Form, Button, Badge, Container } from "react-bootstrap";
import "./ProfileUser.css";
import { profileUser } from "../../api/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProgressBar from "react-bootstrap/ProgressBar";

import { faToggleOn } from "@fortawesome/free-solid-svg-icons";

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
    gender: "N",
    sexualPreference: "N",
    description: "",
    adress: "",
    city: "",
    postalCode: "",
    err: ""
  });
  const handleChange = name => event => {
    const tmp = { ...values, [name]: event.target.value };
    setValues(tmp);
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
          // redirect to /profile or /discover
        }
      })
      .catch(err => console.log(err));
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
                  <FontAwesomeIcon icon={faToggleOn} className="fa-2x mr-5" />
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
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                          <Form.Label>Prenom</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Prenom"
                            onChange={handleChange("lastName")}
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                          <Form.Label>Pseudo</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Pseudo"
                            onChange={handleChange("pseudo")}
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
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                          <Form.Label>Date de naissance</Form.Label>
                          <Form.Control
                            type="date"
                            placeholder="date de naissance"
                            name="date"
                            onChange={handleChange("dateOfBirth")}
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
                          >
                            <option value="N"> Séléctionnez un genre</option>
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
                          >
                            <option value="N"> Séléctionnez un genre</option>
                            <option value="M"> Un Homme </option>
                            <option value="F"> Une Femme </option>
                            <option value="TF"> une Transféminine</option>
                            <option value="TH"> une Transmasculin</option>
                            <option value="B">Bigenre</option>
                          </Form.Control>
                        </Form.Group>
                      </Form.Row>
                      <Form.Group md="12">
                        <Form.Label>Adresse postale</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Adresse"
                          name="Adresse"
                          onChange={handleChange("adress")}
                        />
                      </Form.Group>
                      <Form.Row>
                        <Form.Group as={Col} md="6">
                          <Form.Label>ville</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="ville"
                            name="ville"
                            onChange={handleChange("city")}
                          />
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                          <Form.Label>Code postal</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Code postale"
                            name="code postale"
                            onChange={handleChange("postalCode")}
                          />
                        </Form.Group>
                      </Form.Row>
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
                              <div className=" mytags mr-2 pl-2 mt-2" key={i}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: "#" + tag
                                  }}
                                />

                                <Badge
                                  className="badge-delete"
                                  onClick={handleDeleteTag(i)}
                                >
                                  <sup>x</sup>
                                </Badge>
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
                        />
                      </Form.Group>
                    </Form>
                    <ProgressBar striped variant="info" label="50" now={50} />
                  </Col>
                </Row>
                <Button
                  onClick={() => handleSubmit(values)}
                  className=" mb-5 btn-primary  btn-block text-uppercase profile-btn"
                >
                  Valider
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default ProfileUser;
