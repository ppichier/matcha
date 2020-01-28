import React, { useState, Fragment } from "react";
import { Carousel, Container, Row, Col, Badge } from "react-bootstrap";
import "./Profile.css";
import "./ProfileUser.css";
import CardPicture from "./CardPicture";
import NavbarHeader from "../navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faUserSlash,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
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
                    lastName="Pier'Antonio"
                    pseudo="Ppichier"
                    city="Paris"
                    birthday="05/18/1992"
                  />
                </Row>
                <Row
                  className="Row mt-4 py-3"
                  style={{ justifyContent: "center" }}
                >
                  <FontAwesomeIcon icon={faHeart} className="fa-2x mr-5" />
                  <FontAwesomeIcon icon={faComment} className="fa-2x mr-5" />
                  <FontAwesomeIcon icon={faUserSlash} className="fa-2x mr-5" />

                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="fa-2x"
                  />
                </Row>
              </Col>
            </Row>
          </Col>
          <Col md={8} className="pl-5">
            {/* <Row className="mt-5"> */}
            <Carousel
              activeIndex={index}
              direction={direction}
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
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Profile;
