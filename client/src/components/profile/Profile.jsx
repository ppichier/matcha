import React, { useState, Fragment, useEffect } from "react";
import { Carousel, Container, Row, Col, Badge, Form } from "react-bootstrap";
import "./Profile.css";
import "./ProfileUser.css";
import CardPicture from "../match/CardPicture";
import NavbarHeader from "../navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { readProfile, readSecondaryImages } from "../../api/";
import queryString from "query-string";

import {
  faHeart,
  faComment,
  faUserSlash,
  faUser
} from "@fortawesome/free-solid-svg-icons";

const Profile = ({ location }) => {
  const [values, setValues] = useState({
    indexImages: 0,
    directionImages: null,
    fakeCount: false,
    like: 0
  });

  const [base64Images, setBase64Images] = useState(["", "", "", ""]);

  const [infosUser, setInfosUser] = useState({
    gender: "",
    pseudo: "",
    firstName: "",
    lastName: "",
    userSize: "",
    age: "",
    sexualPreference: "",
    description: "",
    myTags: []
  });

  useEffect(() => {
    const values = queryString.parse(location.search);
    readSecondaryImages()
      .then(data => {
        setBase64Images(data.images);
      })
      .catch(err => console.log(err));

    readProfile(values.uuid)
      .then(data => {
        setInfosUser({ ...data });
      })
      .catch(err => console.log(err));
  }, [location]);

  const handleSelect = (selectedIndex, e) => {
    const tmp = {
      ...values,
      indexImages: selectedIndex,
      directionImages: e.direction
    };
    setValues(tmp);
  };
  const handleFakeCount = () => {
    let tmp;
    if (values.fakeCount === false) tmp = { ...values, fakeCount: true };
    else tmp = { ...values, fakeCount: false };
    setValues(tmp);
  };
  const handleLike = () => {
    let tmp;
    if (values.like === 0) tmp = { ...values, like: 1 };
    else tmp = { ...values, like: 0 };
    setValues(tmp);
  };
  const handleiconLike = () => {
    if (values.like === 0)
      return (
        <FontAwesomeIcon
          icon={faHeart}
          className="fa-2x faHeart"
          onClick={handleLike}
        />
      );
    else
      return (
        <FontAwesomeIcon
          icon={faHeart}
          className="fa-2x faHeartliked"
          onClick={handleLike}
        />
      );
  };
  const handleiconfakeCount = () => {
    if (values.fakeCount === true)
      return (
        <FontAwesomeIcon
          icon={faUserSlash}
          className="fa-2x faHeartliked"
          onClick={handleFakeCount}
        />
      );
    else
      return (
        <FontAwesomeIcon
          icon={faUser}
          className="fa-2x"
          onClick={handleFakeCount}
        />
      );
  };
  const handleImages = () => {
    return base64Images
      .filter(e => e !== "")
      .map((image, i) => {
        return (
          <Carousel.Item key={i}>
            <img
              className="d-block w-100 image"
              src={"data:image/png;base64, " + image}
              alt="First slide"
            />
          </Carousel.Item>
        );
      });
  };
  const isShow = () => {
    if (infosUser.age >= 18) return <Fragment>{infosUser.age} ans</Fragment>;
  };
  const convGenderAndSexualPtoString = () => {
    if (infosUser.gender === 1) return " un Homme";
    else if (infosUser.gender === 2) return " une Femme";
    else if (infosUser.gender === 3) return " une Transféminine";
    else if (infosUser.gender === 4) return " une Transmasculin";
    else if (infosUser.gender === 5) return " Bigenre";
    else if (infosUser.sexualPreference === 1) return " un Homme";
    else if (infosUser.sexualPreference === 2) return " une Femme";
    else if (infosUser.sexualPreference === 3) return " une Transféminine";
    else if (infosUser.sexualPreference === 4) return " une Transmasculin";
    else if (infosUser.sexualPreference === 5) return " Bigenre";
    else return "";
  };
  return (
    <Fragment>
      <NavbarHeader />
      <Container className="my-4">
        <Row>
          <Col md={4} className="mt-5 ">
            <Row>
              <Col>
                <Row className="row-pictureProfile">
                  <CardPicture
                    lastName={infosUser.lastName}
                    pseudo={infosUser.pseudo}
                    birthday={infosUser.age}
                  />
                </Row>
                <Row
                  className="Row mt-4 py-3"
                  style={{
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                    padding: "0 10%"
                  }}
                >
                  {handleiconLike()}
                  <FontAwesomeIcon icon={faComment} className="fa-2x" />
                  {handleiconfakeCount()}
                </Row>
              </Col>
            </Row>
          </Col>
          <Col md={8} className="pl-5">
            <Carousel
              activeIndex={values.indexImages}
              direction={values.directionImages}
              onSelect={handleSelect}
              className="mt-5"
            >
              {handleImages()}
            </Carousel>

            {/* </Row> */}
            <Row className="mb-4 pt-3 pb-4 mt-4 Row">
              <Col>
                <h3 className="descp">{infosUser.firstName}</h3>
                <p className="descp">
                  Je suis {convGenderAndSexualPtoString()}, {isShow()}, je
                  cherche
                  {convGenderAndSexualPtoString()} pour la vie
                </p>
              </Col>
            </Row>
            <Row className="mb-4 pt-3 pb-4 mt-4 Row">
              <Col>
                <h3 className="descp">Centres d'intérêt</h3>
                <div className="descp mytags-main">
                  {infosUser.myTags.map((tag, i) => {
                    return (
                      <Badge key={i} className="mytags  mr-2 pl-2 mt-2">
                        #{tag}
                      </Badge>
                    );
                  })}
                </div>
              </Col>
            </Row>
            <Row className="mb-4 pt-3 pb-4 mt-4 Row">
              <Col>
                <h3 className="descp">A propos de moi</h3>
                <p className="descp">{infosUser.description}</p>
              </Col>
            </Row>
            <Form>
              <Form.Check
                style={{ color: "red" }}
                type="checkbox"
                id="fake account"
                label="Signaler un faux compte"
                name="fake_account"
                onChange={handleFakeCount}
              />
            </Form>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Profile;
