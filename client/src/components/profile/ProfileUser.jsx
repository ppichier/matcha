import React, { useState, useEffect, Fragment } from "react";
import NavbarHeader from "../navbar/Navbar";
import Picture from "./Picture";
import CardPicture from "./CardPicture";
import { Row, Col, Form, Button, Container, Toast } from "react-bootstrap";
import { updateProfile, readProfile } from "../../api/";
import ProgressBar from "react-bootstrap/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { verifValidated, validatedTag } from "../functions/utils";
import "./ProfileUser.css";
import { forgotPassword } from "../../api/auth";
import Slider, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import queryString from "query-string";

const SliderWithTooltip = createSliderWithTooltip(Slider);

const ProfileUser = ({ props, location }) => {
  const [values, setValues] = useState({
    myTags: [],
    commonTags: [],
    email: "",
    pseudo: "",
    firstName: "",
    lastName: "",
    age: "17",
    gender: "",
    sexualPreference: "",
    description: "",
    userSize: "129",
    width: 0,
    err: "",
    msg: "",
    success: false,
    showErrorToast: false,
    showSuccessToast: false
  });

  const [widthProgressBar, setWidthProgressBar] = useState(0);

  useEffect(() => {
    // const { width, ...rest } = values;
    // udpateProgressBar();
    const elements = [
      "pseudo",
      "email",
      "firstName",
      "lastName",
      "userSize",
      "age",
      "gender",
      "sexualPreference",
      "myTags",
      "description"
    ];
    let width = 0;
    for (const element of elements) {
      if (values[element].length !== 0) {
        width += 10;
      }
      if (element === "age" && values.age.toString() === "17") {
        width -= 10;
      }
      if (element === "userSize" && values.userSize.toString() === "129") {
        width -= 10;
      }
    }
    setWidthProgressBar(width);
  }, [values]);

  useEffect(() => {
    const v = queryString.parse(location.search);

    readProfile(v.uuid)
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
            ...data,
            width: 0,
            err: "",
            msg: "",
            success: "",
            showErrorToast: false,
            showSuccessToast: false
          });
        }
      })
      .catch(err => console.log(err));
  }, [location]);
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
  const handleChange = name => event => {
    let value = "";
    if (name === "userSize" || name === "age") {
      value = event;
    } else {
      value = event.target.value;
    }
    const tmp = {
      ...values,
      [name]: value,
      showSuccessToast: false,
      showErrorToast: false
    };
    setValues(tmp);
  };

  // const udpateProgressBar = () => {};

  const handlePress = event => {
    if (event.key === "Enter") {
      event.preventDefault();
      const lenTag = validatedTag(event.target.value);
      if (lenTag.err !== null) {
        const tmp = {
          ...values,
          err: lenTag.err,
          showErrorToast: true,
          showSuccessToast: false
        };
        setValues(tmp);
      } else {
        const tmp = {
          ...values,
          myTags: [...values.myTags, event.target.value]
        };
        setValues(tmp);
      }
    }
  };

  const ageFormatter = v => {
    if (toString(v) === "17") {
      return "Age";
    }
    return `${v} ans`;
  };

  const cmFormatter = v => {
    if (toString(v) === "129") {
      return "Taille";
    }
    return `${v}cm`;
  };

  const handleDeleteTag = i => () => {
    const tab = [...values.myTags];
    tab.splice(i, 1);
    setValues({ ...values, myTags: tab });
  };

  const handleSubmit = event => {
    const verif = verifValidated(values);
    if (verif.err !== null) {
      setValues({
        ...values,
        err: verif.err,
        success: false,
        showErrorToast: true,
        showSuccessToast: false
      });
    } else {
      updateProfile({
        myTags: values.myTags,
        email: values.email,
        pseudo: values.pseudo,
        firstName: values.firstName,
        lastName: values.lastName,
        age: values.age,
        gender: values.gender,
        sexualPreference: values.sexualPreference,
        userSize: values.userSize,
        description: values.description
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
            console.log(data);
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
  const handleChangePassword = event => {
    event.preventDefault();
    forgotPassword({
      email: values.email
    })
      .then(data => {
        if (data.err) {
          setValues({
            ...values,
            err: data.err,
            showErrorToast: true,
            showSuccessToast: false
          });
        } else if (data.msg) {
          setValues({
            ...values,
            email: "",
            err: "",
            msg: data.msg,
            showErrorToast: false,
            showSuccessToast: true
          });
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
                <Row className="row-pictureProfile py-4">
                  <CardPicture
                    pseudo={values.pseudo}
                    lastName={values.lastName}
                    city={values.city}
                    birthday={values.age}
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
            <button
              className="btn btn-link btn-block mt-4 text-dark"
              onClick={handleChangePassword}
            >
              Modifier votre mot de passe
            </button>
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
                        <Form.Group as={Col} md="6">
                          <Form.Label>Nom</Form.Label>
                          <Form.Control
                            value={values.firstName}
                            type="text"
                            placeholder="Nom"
                            onChange={handleChange("firstName")}
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                          <Form.Label>Prénom</Form.Label>
                          <Form.Control
                            value={values.lastName}
                            type="text"
                            placeholder="Prenom"
                            onChange={handleChange("lastName")}
                          ></Form.Control>
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col} md="6">
                          <Form.Label>Pseudo</Form.Label>
                          <Form.Control
                            value={values.pseudo}
                            type="text"
                            placeholder="Pseudo"
                            onChange={handleChange("pseudo")}
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            value={values.email}
                            type="email"
                            placeholder="Email"
                            onChange={handleChange("email")}
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
                        <Form.Group as={Col} md="6" className="px-3">
                          <Form.Label>Age</Form.Label>
                          <SliderWithTooltip
                            min={17}
                            max={65}
                            value={parseFloat(values.age)}
                            tipFormatter={ageFormatter}
                            onChange={handleChange("age")}
                            marks={{ 18: 18, 65: 65 }}
                          />
                        </Form.Group>
                        <Form.Group as={Col} md="6" className="px-3">
                          <Form.Label>Taille</Form.Label>
                          <SliderWithTooltip
                            min={129}
                            max={230}
                            value={parseFloat(values.userSize)}
                            tipFormatter={cmFormatter}
                            onChange={handleChange("userSize")}
                            marks={{ 130: 130, 230: 230 }}
                          />
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
                            value={values.gender}
                            onChange={handleChange("gender")}
                          >
                            <option value=""> Séléctionnez un genre</option>
                            <option value="1"> Un Homme </option>
                            <option value="2"> Une Femme </option>
                            <option value="3"> une Transféminine</option>
                            <option value="4"> une Transmasculin</option>
                            <option value="5">Bigenre</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} md="6">
                          <Form.Label>Je cherche</Form.Label>
                          <Form.Control
                            as="select"
                            value={values.sexualPreference}
                            onChange={handleChange("sexualPreference")}
                          >
                            <option value=""> Séléctionnez un genre</option>
                            <option value="1"> Un Homme </option>
                            <option value="2"> Une Femme </option>
                            <option value="3"> une Transféminine</option>
                            <option value="4"> une Transmasculin</option>
                            <option value="5">Bigenre</option>
                          </Form.Control>
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
                              id="vegan"
                              label="vegan"
                              name="commonTags"
                            />
                          </Col>
                          <Col>
                            <Form.Check
                              type="checkbox"
                              id="bio"
                              label="bio"
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
                          value={values.description}
                          onChange={handleChange("description")}
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
                        label={widthProgressBar + "%"}
                        now={widthProgressBar}
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
                {showSuccess()}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default ProfileUser;
