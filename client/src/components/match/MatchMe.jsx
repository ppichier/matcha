import React, { useState, Fragment } from "react";
import "../profile/CardPicture.css";
import "../profile/CardPicture";
import { Row, Col, Form, Container } from "react-bootstrap";
import CardPicture from "../profile/CardPicture";
import NavbarHeader from "../navbar/Navbar";
import FilterProfile from "./FilterProfile";
import Slider, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
// import Navbar from "react-bootstrap/Navbar";
import "./MatchMe.css";

// import NWReactSlider from "nw-react-slider";
const SliderWithTooltip = createSliderWithTooltip(Slider);

const MatchMe = ({ pseudo, lastName, city, birthday }) => {
  const [values, setValues] = useState({
    image: [],
    uploading: false
  });
  const handleChange = event => {
    event.preventDefault();

    const files = Array.from(event.target.files);
    const tmp = { ...values, image: [...values.image, files] };
    // const formData = new FormData();
    setValues(tmp);
  };
  const age = birthday => {
    birthday = new Date(birthday);
    return ((new Date().getTime() - birthday.getTime()) / 31536000000).toFixed(
      0
    );
  };
  const isShow = birthday => {
    if (birthday) return <div>Age: {age(birthday)}</div>;
  };
  return (
    <Fragment>
      <NavbarHeader />
      <Container fluid className="my-3">
        <Row>
          <Col md={3} style={{ height: "100%" }} className="py-3">
            <FilterProfile />
          </Col>
          {/* <Row> */}
          <Col className="">
            <Row style={{ justifyContent: "center" }}>
              <div className="styleCard py-3 px-3 mx-3 my-3">
                <CardPicture
                  lastName="Pier'Antonio"
                  pseudo="Ppichier"
                  city="Paris"
                  birthday="05/18/1992"
                  nb={1}
                />
              </div>

              <div className="styleCard py-3 px-3 mx-3 my-3">
                <CardPicture
                  lastName="Pier'Antonio"
                  pseudo="Ppichier"
                  city="Paris"
                  birthday="05/18/1992"
                  nb={1}
                />
              </div>

              <div className="styleCard py-3 px-3 mx-3 my-3">
                <CardPicture
                  lastName="Pier'Antonio"
                  pseudo="Ppichier"
                  city="Paris"
                  birthday="05/18/1992"
                  nb={1}
                />
              </div>

              <div className="styleCard py-3 px-3 mx-3 my-3">
                <CardPicture
                  lastName="Pier'Antonio"
                  pseudo="Ppichier"
                  city="Paris"
                  birthday="05/18/1992"
                  nb={1}
                />
              </div>

              <div className="styleCard py-3 px-3 mx-3 my-3">
                <CardPicture
                  lastName="Pier'Antonio"
                  pseudo="Ppichier"
                  city="Paris"
                  birthday="05/18/1992"
                  nb={1}
                />
              </div>

              <div className="styleCard py-3 px-3 mx-3 my-3">
                <CardPicture
                  lastName="Pier'Antonio"
                  pseudo="Ppichier"
                  city="Paris"
                  birthday="05/18/1992"
                  nb={1}
                />
              </div>
              <div className="styleCard py-3 px-3 mx-3 my-3">
                <CardPicture
                  lastName="Pier'Antonio"
                  pseudo="Ppichier"
                  city="Paris"
                  birthday="05/18/1992"
                  nb={1}
                />
              </div>

              <div className="styleCard py-3 px-3 mx-3 my-3">
                <CardPicture
                  lastName="Pier'Antonio"
                  pseudo="Ppichier"
                  city="Paris"
                  birthday="05/18/1992"
                  nb={1}
                />
              </div>

              <div className="styleCard py-3 px-3 mx-3 my-3">
                <CardPicture
                  lastName="Pier'Antonio"
                  pseudo="Ppichier"
                  city="Paris"
                  birthday="05/18/1992"
                  nb={1}
                />
              </div>

              <div className="styleCard py-3 px-3 mx-3 my-3">
                <CardPicture
                  lastName="Pier'Antonio"
                  pseudo="Ppichier"
                  city="Paris"
                  birthday="05/18/1992"
                  nb={1}
                />
              </div>

              <div className="styleCard py-3 px-3 mx-3 my-3">
                <CardPicture
                  lastName="Pier'Antonio"
                  pseudo="Ppichier"
                  city="Paris"
                  birthday="05/18/1992"
                  nb={1}
                />
              </div>

              <div className="styleCard py-3 px-3 mx-3 my-3">
                <CardPicture
                  lastName="Pier'Antonio"
                  pseudo="Ppichier"
                  city="Paris"
                  birthday="05/18/1992"
                  nb={1}
                />
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default MatchMe;
