import React, { useState, useEffect, Fragment } from "react";
import NavbarHeader from "../navbar/Navbar";
import Picture from "./Picture";
import ProfilePicture from "./ProfilePicture";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import {
  updateProfile,
  readProfile,
  readImage,
  readSecondaryImages,
} from "../../api/user";
import ProgressBar from "react-bootstrap/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faKey } from "@fortawesome/free-solid-svg-icons";
import { verifValidated, validatedTag } from "../functions/utils";
import "./ProfileUser.css";
import { forgotPassword } from "../../api/auth";
import Slider, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import queryString from "query-string";
import ProfileMap from "./ProfileMap";
import { notificationAlert } from "../functions/notification";

const SliderWithTooltip = createSliderWithTooltip(Slider);

const ProfileUser = ({ props, location, socket }) => {
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
    localisationActive: false,
    lat: 48.865,
    lng: 2.3551,
  });

  const [imagesChild, setImagesChild] = useState({
    profileImage: false,
    secondaryImages: false,
  });
  const [widthProgressBar, setWidthProgressBar] = useState(0);

  useEffect(() => {
    socket.emit(
      "register",
      JSON.parse(localStorage.getItem("jwt")).token,
      (data) => {
        // console.log(data);
      }
    );
  }, [socket]);

  useEffect(() => {
    const v = queryString.parse(location.search);
    // console.log(v);

    //Send uuid profile

    readProfile(v.uuid)
      .then((data) => {
        if (data.err) {
          notificationAlert(data.err, "danger", "bottom-center");
        } else {
          setValues({
            ...data,
          });
        }
      })
      .catch((err) => console.log(err));
  }, [location]);

  useEffect(() => {
    const inc = 7.6923;
    let w = 0;
    w = values.pseudo && values.pseudo.length > 0 ? (w += inc) : w;
    w = values.email && values.email.length > 0 ? (w += inc) : w;
    w = values.firstName && values.firstName.length > 0 ? (w += inc) : w;
    w = values.lastName && values.lastName.length > 0 ? (w += inc) : w;
    w = values.userSize && values.userSize > 129 ? (w += inc) : w;
    w = values.age && values.age > 17 ? (w += inc) : w;
    w = values.description && values.description.length > 0 ? (w += inc) : w;
    w = values.gender && values.gender.toString() !== "6" ? (w += inc) : w;
    w =
      values.sexualPreference && values.sexualPreference.toString() !== "6"
        ? (w += inc)
        : w;
    w =
      values.myTags.length > 0 ||
      values.commonTags.filter((e) => e.checked).length > 0
        ? (w += inc)
        : w;
    w = values.localisationActive ? (w += inc) : w;

    readImage()
      .then((data) => {
        w = data.image === null ? w : (w += inc);
        readSecondaryImages().then((data) => {
          if (data.err) {
            notificationAlert(data.err, "danger", "bottom-center");
          } else {
            w = data.images.filter((e) => e !== "").length > 0 ? (w += inc) : w;
            setWidthProgressBar(w);
          }
        });
      })
      .catch((err) => console.log(err));
  }, [values, imagesChild]);

  const handleChange = (name) => (event) => {
    let value = "";
    if (name === "userSize" || name === "age") {
      value = event;
    } else {
      value = event.target.value;
    }
    setValues({ ...values, [name]: value });
  };

  const handleClickCommonTag = (tag, i) => (event) => {
    const lenTag = validatedTag(tag);
    if (lenTag.err !== null) {
      notificationAlert(lenTag.err, "danger", "bottom-center");
    } else {
      const a = values.commonTags;
      a.splice(i, 1);
      a.splice(i, 0, { label: tag, checked: event.target.checked });
      setValues({
        ...values,
        commonTags: a,
      });
    }
  };

  const handlePress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const lenTag = validatedTag(event.target.value);
      if (lenTag.err !== null) {
        notificationAlert(lenTag.err, "danger", "bottom-center");
      } else {
        setValues({
          ...values,
          myTags: [...values.myTags, event.target.value],
        });
      }
    }
  };

  const ageFormatter = (v) => {
    if (v.toString() === "17") {
      return "Age";
    }
    return `${v} ans`;
  };

  const cmFormatter = (v) => {
    if (v.toString() === "129") {
      return "Taille";
    }
    return `${v}cm`;
  };

  const handleDeleteTag = (i) => () => {
    const tab = [...values.myTags];
    tab.splice(i, 1);
    setValues({ ...values, myTags: tab });
  };

  const handleSubmit = async (event) => {
    const verif = verifValidated(values);

    if (verif.err !== null) {
      notificationAlert(verif.err, "danger", "bottom-center");
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
          method: "GET",
        }).catch((err) => console.log(err));
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
        widthProgressBar: widthProgressBar,
        lat,
        lng,
        localisationActive: values.localisationActive,
      })
        .then((data) => {
          if (data.err) {
            notificationAlert(data.err, "danger", "bottom-center");
          } else {
            notificationAlert(
              "Votre profil a été mis à jour.",
              "success",
              "bottom-center"
            );
            // redirect to /profile or /discover
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const handleChangePassword = (event) => {
    event.preventDefault();
    forgotPassword({
      email: values.email,
    })
      .then((data) => {
        if (data.err) {
          notificationAlert(data.err, "danger", "bottom-center");
        } else if (data.msg) {
          notificationAlert(data.msg, "success", "bottom-center");
        }
      })
      .catch((err) => console.log(err));
  };

  const imageProfileSet = (value) => {
    setImagesChild({ ...imagesChild, profileImage: value });
  };

  const imageSecondarySet = (value) => {
    setImagesChild({ ...imagesChild, secondaryImages: value });
  };
  const updateProfilePosition = (coord) => {
    setValues({ ...values, lat: coord.lat, lng: coord.lng });
  };

  const displayMap = () => {
    if (values.localisationActive) {
      return (
        <div className="my-3 map">
          <ProfileMap
            lat={values.lat}
            lng={values.lng}
            updateProfilePosition={(coord) => updateProfilePosition(coord)}
          />
        </div>
      );
    } else return <Fragment></Fragment>;
  };

  const getLocation = (e) => {
    const showPosition = (position) => {
      setValues({
        ...values,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        localisationActive: true,
      });
    };

    const notAllowedPosition = () => {
      //check for ip to localize
      setValues({
        ...values,
        localisationActive: false,
      });
    };

    if (e.target.checked) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          showPosition,
          notAllowedPosition
        );
      } else {
        notificationAlert(
          "Geolocalistation non supportée par le navigateur",
          "danger",
          "bottom-center"
        );
      }
    } else {
      setValues({
        ...values,
        localisationActive: false,
      });
    }
  };

  return (
    <Fragment>
      <NavbarHeader socket={socket} />
      <Container>
        <Row className="main-row-container">
          <Col md={5} className="mt-5 ">
            <Row>
              <Col>
                <Row className="row-pictureProfile py-4">
                  <ProfilePicture
                    pseudo={values.pseudo}
                    firstName={values.firstName}
                    city={values.city}
                    birthday={values.age}
                    imageProfileSet={(value) => imageProfileSet(value)}
                  />
                </Row>
                <Row
                  className="Row mt-4 py-3"
                  style={{ flexDirection: "column", alignItems: "center" }}
                >
                  <Form.Check
                    className="form-location-label"
                    type="switch"
                    id="switch"
                    label="Activer la localisation"
                    checked={values.localisationActive}
                    onChange={(e) => {
                      getLocation(e);
                    }}
                  />
                  {displayMap()}
                </Row>
              </Col>
            </Row>
            <Row className="mt-4">
              <button
                className="form-resetpwd-label btn btn-link btn-block"
                onClick={handleChangePassword}
              >
                <FontAwesomeIcon icon={faKey} className=" mx-2 mytags-delete" />
                Modifier votre mot de passe
              </button>
            </Row>
          </Col>
          <Col md={7} className="pl-5">
            <Row className="mt-5 mb-1 row-picture">
              <Picture
                imageSecondarySet={(value) => imageSecondarySet(value)}
              />
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
                          Les intérêts les plus populaires
                        </Form.Label>

                        <div className="commontags">
                          {values.commonTags.map((e, i) => {
                            return (
                              <div key={i} className="px-2">
                                <Form.Check
                                  key={i}
                                  type="checkbox"
                                  id={e.label}
                                  label={e.label}
                                  checked={e.checked}
                                  onChange={handleClickCommonTag(e.label, i)}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Rajouter de nouveaux intérêts</Form.Label>
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
                                    __html: "#" + tag,
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
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default ProfileUser;
