import React, { useState, Fragment } from "react";
import "../profile/CardPicture.css";
import "../profile/CardPicture";
import { Row, Col } from "react-bootstrap";
import CardPicture from "../profile/CardPicture";
import NavbarHeader from "../navbar/Navbar";
import Navbar from "react-bootstrap/Navbar";
import "./MatchMe.css";

// import NWReactSlider from "nw-react-slider";

const MatchMe = ({ pseudo, lastName, city, birthday }) => {
  const [values, setValues] = useState({
    image: [],
    uploading: false,
    value: { min: 2, max: 10 }
  });
  const handleChange = event => {
    event.preventDefault();

    const files = Array.from(event.target.files);
    const tmp = { ...values, image: [...values.image, files] };
    const formData = new FormData();
    setValues(tmp);
  };
  const age = birthday => {
    birthday = new Date(birthday);
    return new Number(
      (new Date().getTime() - birthday.getTime()) / 31536000000
    ).toFixed(0);
  };
  const isShow = birthday => {
    if (birthday) return <div>Age: {age(birthday)}</div>;
  };
  return (
    <Fragment>
      <NavbarHeader />
      {/* <Container> */}
      <Row>
        <Col md={4} className="pl-5">
          <Row className="style_menu mt-5">
            <Col>
              <p></p>
            </Col>
          </Row>
        </Col>
        <Col className="pl-5 pr-4">
          <Row className="mt-5 ml-4">
            <Row className="styleCard mr-4 mb-4">
              <Col>
                <CardPicture
                  lastName="Pier'Antonio"
                  pseudo="Ppichier"
                  city="Paris"
                  birthday="05/18/1992"
                  nb={1}
                />
              </Col>
            </Row>
            <Row className="styleCard mr-4 mb-4">
              <Col>
                <CardPicture
                  lastName="Wafae"
                  pseudo="Warharra"
                  city="Paris"
                  birthday="05/18/1992"
                  nb={1}
                />
              </Col>
            </Row>
            <Row className="styleCard mr-4 mb-4">
              <Col>
                <CardPicture
                  lastName="Jules"
                  pseudo="Jumourot"
                  city="Paris"
                  birthday="05/18/1992"
                  nb={1}
                />
              </Col>
            </Row>
            <Row className="styleCard mr-4 mb-4">
              <Col>
                <CardPicture
                  lastName="Judith"
                  pseudo="Jpoulvel"
                  city="Paris"
                  birthday="05/18/1992"
                  nb={1}
                />
              </Col>
            </Row>
            <Row className="styleCard mr-4 mb-4">
              <Col>
                <CardPicture
                  lastName="Myriam"
                  pseudo="Manki"
                  city="Paris"
                  birthday="05/18/1992"
                  nb={1}
                />
              </Col>
            </Row>
            <Row className="styleCard mr-4 mb-4">
              <Col>
                {" "}
                <CardPicture
                  lastName="Edd"
                  pseudo="Ylaissyi"
                  city="Paris"
                  birthday="05/18/1992"
                  nb={1}
                />
              </Col>
            </Row>
            <Row className="styleCard mr-4 mb-4">
              <Col>
                <CardPicture
                  lastName="Mohammed"
                  pseudo="Moslama"
                  city="Paris"
                  birthday="05/18/1992"
                  nb={1}
                />
              </Col>
            </Row>
            <Row className="styleCard mr-4 mb-4">
              <Col>
                <CardPicture
                  lastName="Valentin"
                  pseudo="Vrossi"
                  city="Paris"
                  birthday="05/18/1992"
                  nb={1}
                />
              </Col>
            </Row>
            <Row className="styleCard mr-4 mb-4">
              <Col>
                <CardPicture
                  lastName="Alexandra"
                  pseudo="Perrin"
                  city="Paris"
                  birthday="05/18/1992"
                  nb={1}
                />
              </Col>
            </Row>
            <Row className="styleCard mr-4 mb-4">
              <Col>
                <CardPicture
                  lastName="Yacine"
                  pseudo="Ychair"
                  city="Paris"
                  birthday="05/18/1992"
                  nb={1}
                />
              </Col>
            </Row>
            <Row className="styleCard mr-4 mb-4">
              <Col>
                <CardPicture
                  lastName="Stephen"
                  pseudo="Stelie"
                  city="Paris"
                  birthday="05/18/1992"
                  nb={1}
                />
              </Col>
            </Row>
            <Row className="styleCard mr-4 mb-4">
              <Col>
                <CardPicture
                  lastName="Fadia"
                  pseudo="Zfadia"
                  city="Paris"
                  birthday="05/18/1992"
                  nb={1}
                />
              </Col>
            </Row>
          </Row>
        </Col>
      </Row>
      {/* </Container> */}
    </Fragment>
  );
};
export default MatchMe;
