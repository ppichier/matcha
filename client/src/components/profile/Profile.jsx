import React, { useState, Fragment } from "react";
import { Carousel, Container, Row, Col, Badge, Form } from "react-bootstrap";
import "./Profile.css";
import "./ProfileUser.css";
import CardPicture from "./CardPicture";
import NavbarHeader from "../navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faUserSlash,
  faUser
} from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const [values, setValues] = useState({
    indexImages: 0,
    directionImages: null,
    fakeCount: false,
    like: 0
  });
  console.log(values.fakeCount);
  const handleSelect = (selectedIndex, e) => {
    const tmp = {
      ...values,
      indexImages: selectedIndex,
      directionImages: e.direction
    };
    setValues(tmp);
  };
  const handleFakeCount = () => {
    console.log("je rentre ici");

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
          className="fa-2x mr-5 faHeart"
          onClick={handleLike}
        />
      );
    else
      return (
        <FontAwesomeIcon
          icon={faHeart}
          className="fa-2x mr-5 faHeartliked"
          onClick={handleLike}
        />
      );
  };
  const handleiconfakeCount = () => {
    if (values.fakeCount === true)
      return (
        <FontAwesomeIcon
          icon={faUserSlash}
          className="fa-2x mr-5 faHeartliked"
          onClick={handleFakeCount}
        />
      );
    else
      return (
        <FontAwesomeIcon
          icon={faUser}
          className="fa-2x mr-5"
          onClick={handleFakeCount}
        />
      );
  };
  return (
    <Fragment>
      <NavbarHeader />
      <Container>
        <Row>
          <Col md={4} className="mt-5 ">
            <Row>
              <Col>
                <Row className="row-pictureProfile">
                  <CardPicture
                    lastName="Pier'Antonio"
                    pseudo="Ppichier"
                    city="Paris"
                    birthday="05/18/1992"
                    nb={1}
                  />
                </Row>
                <Row
                  className="Row mt-4 py-3"
                  style={{ justifyContent: "center", flexWrap: "wrap" }}
                >
                  {handleiconLike()}
                  <FontAwesomeIcon icon={faComment} className="fa-2x mr-5" />
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
              <Carousel.Item>
                <img
                  className="d-block w-100 image"
                  src="https://www.azutura.com/media/catalog/product/cache/48/image/650x/040ec09b1e35df139433887a97daa66f/W/S/WS-42559_WP.jpg"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 image"
                  src="https://www.azutura.com/media/catalog/product/cache/48/image/650x/040ec09b1e35df139433887a97daa66f/W/S/WS-42559_WP.jpg"
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 image"
                  src="https://www.azutura.com/media/catalog/product/cache/48/image/650x/040ec09b1e35df139433887a97daa66f/W/S/WS-42559_WP.jpg"
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
            {/* </Row> */}
            <Row className="mb-4 pt-3 pb-4 mt-4 Row">
              <Col>
                <h3 className="descp">Pier'Antonio</h3>
                <p className="descp">
                  Je suis un Homme, 28 ans, je cherche une femme pour la vie
                </p>
              </Col>
            </Row>
            <Row className="mb-4 pt-3 pb-4 mt-4 Row">
              <Col>
                <h3 className="descp">Centres d'intérêt</h3>
                <div className="descp">
                  <Badge className="mytags mr-2 pl-2 mt-2">#Aventure</Badge>
                  <Badge className="mytags mr-2 pl-2 mt-2">#Vegan</Badge>
                  <Badge className="mytags mr-2 pl-2 mt-2">#bio</Badge>
                </div>
              </Col>
            </Row>
            <Row className="mb-4 pt-3 pb-4 mt-4 Row">
              <Col>
                <h3 className="descp">A propos de moi</h3>
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
