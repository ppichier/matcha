import React, { useState, useEffect, Fragment } from "react";
import NavbarHeader from "../navbar/Navbar";
import Picture from "./Picture";
import ProfilePicture from "./ProfilePicture";
import { Row, Col, Form, Button, Container, Toast } from "react-bootstrap";
import { updateProfile, readProfile } from "../../api/user";
import ProgressBar from "react-bootstrap/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { verifValidated, validatedTag } from "../functions/utils";
import "./ProfileUser.css";
import { forgotPassword } from "../../api/auth";
import Slider, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import queryString from "query-string";
import ProfileMap from "./ProfileMap";

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
    imageProfileSet: false,
    localisationActive: false,
    lat: 48.865,
    lng: 2.3551
  });

  const [secondaryValues, setSecondaryValues] = useState({
    err: "",
    msg: "",
    showErrorToast: false,
    showSuccessToast: false
  });

  const [imagesChild, setImagesChild] = useState({
    profileImage: false,
    secondaryImages: false
  });

  const [widthProgressBar, setWidthProgressBar] = useState(0);

  useEffect(() => {
    const v = queryString.parse(location.search);
    console.log(v);

    //Send uuid profile

    readProfile(v.uuid)
      .then(data => {
        if (data.err) {
          setSecondaryValues({
            err: data.err,
            msg: "",
            showErrorToast: true,
            showSuccessToast: false
          });
        } else {
          setValues({
            ...data
          });
          setSecondaryValues({
            err: "",
            msg: "",
            showErrorToast: false,
            showSuccessToast: false
          });
        }
      })
      .catch(err => console.log(err));
  }, [location]);

  useEffect(() => {
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
      "commonTags",
      "description"
    ];

    let width = 0;
    for (const element of elements) {
      if (
        values[element] &&
        element === "commonTags" &&
        values.myTags.length === 0 &&
        values.commonTags.filter(e => e.checked).length > 0
      ) {
        width += 8.3333;
      } else if (
        values[element] &&
        element === "myTags" &&
        values.myTags.length > 0
      ) {
        width += 8.3333;
      }
      if (
        values[element] &&
        values[element] === "gender" &&
        values[element] !== "6"
      )
        width += 8.3333;
      if (
        values[element] &&
        element !== "commonTags" &&
        element !== "myTags" &&
        values[element].length !== 0
      ) {
        width += 8.3333;
      }
      // if (
      //   values[element] &&
      //   element === "age" &&
      //   values.age.toString() === "17"
      // ) {
      //   width -= 8.3333;
      // }
      if (
        values[element] &&
        element === "userSize" &&
        values.userSize.toString() === "129"
      ) {
        width -= 8.3333;
      }
    }

    width = imagesChild.profileImage ? (width += 8.3333) : width;
    // width = imagesChild.secondaryImages ? (width += 10) : width;

    setWidthProgressBar(width);
  }, [values, imagesChild]);

  const showError = () => {
    return (
      <Toast
        style={{ backgroundColor: "red", maxWidth: "none" }}
        animation
        onClose={() =>
          setSecondaryValues({ ...setSecondaryValues, showErrorToast: false })
        }
        show={secondaryValues.showErrorToast}
        className="mt-2"
      >
        <Toast.Header closeButton={false}>{secondaryValues.err}</Toast.Header>
      </Toast>
    );
  };

  const showSuccess = () => {
    return (
      <Toast
        style={{ backgroundColor: "#63c7ac", maxWidth: "none" }}
        animation
        onClose={() =>
          setSecondaryValues({ ...secondaryValues, showSuccessToast: false })
        }
        show={secondaryValues.showSuccessToast}
        className="mt-2"
      >
        <Toast.Header closeButton={false}>{secondaryValues.msg}</Toast.Header>
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
    setValues({ ...values, [name]: value });
    setSecondaryValues({
      ...setSecondaryValues,
      showSuccessToast: false,
      showErrorToast: false
    });
  };

  const handleClickCommonTag = (tag, i) => event => {
    const lenTag = validatedTag(tag);
    if (lenTag.err !== null) {
      setSecondaryValues({
        msg: "",
        err: lenTag.err,
        showErrorToast: true,
        showSuccessToast: false
      });
    } else {
      const a = values.commonTags;
      a.splice(i, 1);
      a.splice(i, 0, { label: tag, checked: event.target.checked });
      setValues({
        ...values,
        commonTags: a
      });
    }
  };

  const handlePress = event => {
    if (event.key === "Enter") {
      event.preventDefault();
      const lenTag = validatedTag(event.target.value);
      if (lenTag.err !== null) {
        setSecondaryValues({
          msg: "",
          err: lenTag.err,
          showErrorToast: true,
          showSuccessToast: false
        });
      } else {
        setValues({
          ...values,
          myTags: [...values.myTags, event.target.value]
        });
      }
    }
  };

  const ageFormatter = v => {
    if (v.toString() === "17") {
      return "Age";
    }
    return `${v} ans`;
  };

  const cmFormatter = v => {
    if (v.toString() === "129") {
      return "Taille";
    }
    return `${v}cm`;
  };

  const handleDeleteTag = i => () => {
    const tab = [...values.myTags];
    tab.splice(i, 1);
    setValues({ ...values, myTags: tab });
  };

  const handleSubmit = async event => {
    const verif = verifValidated(values);

    if (verif.err !== null) {
      setSecondaryValues({
        msg: "",
        err: verif.err,
        showErrorToast: true,
        showSuccessToast: false
      });
    } else {
      const joinTags = [...values.myTags];
      for (let i = 0; i < values.commonTags.length; i++) {
        if (values.commonTags[i].checked === true)
          joinTags.push(values.commonTags[i].label);
      }
      let lat = values.lat;
      let lng = values.lng;
      if (!values.localisationActive) {
        let res = await fetch(`https://geolocation-db.com/json/`, {
          method: "GET"
        }).catch(err => console.log(err));
        let coords = await res.json();
        lat = coords.latitude;
        lng = coords.longitude;
      }
      updateProfile({
        myTags: joinTags,
        email: values.email,
        pseudo: values.pseudo,
        firstName: values.firstName,
        lastName: values.lastName,
        age: values.age,
        gender: values.gender,
        sexualPreference: values.sexualPreference,
        userSize: values.userSize,
        description: values.description,
        lat,
        lng,
        localisationActive: values.localisationActive
      })
        .then(data => {
          if (data.err) {
            setSecondaryValues({
              msg: "",
              err: data.err,
              showErrorToast: true,
              showSuccessToast: false
            });
          } else {
            setSecondaryValues({
              err: "",
              msg: data.msg,
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
          setSecondaryValues({
            msg: "",
            err: data.err,
            showErrorToast: true,
            showSuccessToast: false
          });
        } else if (data.msg) {
          setSecondaryValues({
            // email: "",
            err: "",
            msg: data.msg,
            showErrorToast: false,
            showSuccessToast: true
          });
        }
      })
      .catch(err => console.log(err));
  };

  const imageProfileSet = value => {
    setImagesChild({ ...imagesChild, profileImage: value });
  };

  const updateProfilePosition = coord => {
    setValues({ ...values, lat: coord.lat, lng: coord.lng });
  };

  const displayMap = () => {
    if (values.localisationActive) {
      return (
        <div className="my-3 map">
          <ProfileMap
            lat={values.lat}
            lng={values.lng}
            updateProfilePosition={coord => updateProfilePosition(coord)}
          />
        </div>
      );
    } else return <Fragment></Fragment>;
  };

  const getLocation = e => {
    const showPosition = position => {
      setValues({
        ...values,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        localisationActive: true
      });
    };

    const notAllowedPosition = () => {
      //check for ip to localize
      setValues({
        ...values,
        localisationActive: false
      });
    };

    if (e.target.checked) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          showPosition,
          notAllowedPosition
        );
      } else {
        setSecondaryValues({
          msg: "",
          err: "Geolocalistation non supporté par le navigateur.",
          showErrorToast: true,
          showSuccessToast: false
        });
      }
    } else {
      setValues({
        ...values,
        localisationActive: false
      });
    }
  };

  return (
    <Fragment>
      <NavbarHeader />
      <Container>
        <Row style={{ flexWrap: "wrap" }}>
          <Col md={5} className="mt-5 ">
            <Row>
              <Col>
                <Row className="row-pictureProfile py-4">
                  <ProfilePicture
                    pseudo={values.pseudo}
                    firstName={values.firstName}
                    city={values.city}
                    birthday={values.age}
                    imageProfileSet={value => imageProfileSet(value)}
                  />
                </Row>
                <Row
                  className="Row mt-4 py-3"
                  style={{ flexDirection: "column", alignItems: "center" }}
                >
                  <Form.Check
                    type="switch"
                    id="switch"
                    label="Activer la localisation"
                    checked={values.localisationActive}
                    onChange={e => {
                      getLocation(e);
                    }}
                  />
                  {displayMap()}
                </Row>
              </Col>
            </Row>
            <button
              className="btn btn-link btn-block mt-4 text-dark"
              onClick={handleChangePassword}
              style={{ fontWeight: "bold" }}
            >
              Modifier votre mot de passe
            </button>
          </Col>
          <Col md={7} className="pl-5">
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
                            value={values.lastName}
                            type="text"
                            placeholder="Nom"
                            onChange={handleChange("lastName")}
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                          <Form.Label>Prénom</Form.Label>
                          <Form.Control
                            value={values.firstName}
                            type="text"
                            placeholder="Prenom"
                            onChange={handleChange("firstName")}
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
                            <option value="6"> Séléctionnez un genre</option>
                            <option value="1"> Un Homme </option>
                            <option value="2"> Une Femme </option>
                            <option value="3"> une Transmasculin</option>
                            <option value="4"> une Transféminine</option>
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
                            <option value="6"> Séléctionnez un genre</option>
                            <option value="1"> Un Homme </option>
                            <option value="2"> Une Femme </option>
                            <option value="3"> une Transmasculin</option>
                            <option value="4"> une Transféminine</option>
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

                        <div className="commontags">
                          <Row>
                            {values.commonTags.map((e, i) => {
                              return (
                                <Col key={i}>
                                  <Form.Check
                                    key={i}
                                    type="checkbox"
                                    id={e.label}
                                    label={e.label}
                                    checked={e.checked}
                                    onChange={handleClickCommonTag(e.label, i)}
                                  />
                                </Col>
                              );
                            })}
                          </Row>
                        </div>
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
                        label={Math.round(widthProgressBar) + "%"}
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
