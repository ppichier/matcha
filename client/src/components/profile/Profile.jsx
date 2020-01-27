import React, { useState, Fragment } from "react";
import { Carousel, Container, Row, Col } from "react-bootstrap";
// import "./Profile.css";
import "./ProfileUser.css";
import CardPicture from "./CardPicture";
import NavbarHeader from "../navbar/Navbar";
import { cardPicture } from "../../api/auth";

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
        <Row>
          <Col md={4} className="mt-5  row-pictureProfile">
            <CardPicture />
          </Col>
          <Col md={8} className="pl-5">
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
                  src="https://image.shutterstock.com/image-photo/floral-spring-natural-landscape-wild-260nw-1274207287.jpg"
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
          </Col>
        </Row>

        <Row className="mb-4 pt-3 pb-4 mt-4 Row">
          <Col>
            <h3>Pier'Antonio</h3>
            <p>Homme, 28 ans il cherche une femme</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Pier'Antonio</h3>
            <p>Homme, 28 ans il cherche une femme</p>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Profile;
