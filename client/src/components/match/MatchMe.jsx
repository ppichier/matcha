import React, { useState, Fragment } from "react";
import "./CardPicture.css";
import { Row, Col, Container } from "react-bootstrap";
import CardPicture from "./CardPicture";
import NavbarHeader from "../navbar/Navbar";
import FilterProfile from "./FilterProfile";
import Slider, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import "./MatchMe.css";
import SortProfile from "./SortProfile";

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

  return (
    <Fragment>
      <NavbarHeader />
      <Container fluid className="my-3">
        <Row>
          <Col md={3} style={{ height: "100%" }} className="py-3 ">
            <SortProfile />
            <FilterProfile />
          </Col>

          {/* <Row> */}
          <Col className="">
            <Row style={{ justifyContent: "center" }}>
              <div className="styleCard py-3 px-3 mx-3 my-3">
                <CardPicture
                  lastName="Pier'Antonio"
                  pseudo="Ppichier"
                  birthday="05/18/1992"
                />
              </div>

              <div className="styleCard py-3 px-3 mx-3 my-3">
                <CardPicture
                  lastName="Pier'Antonio"
                  pseudo="Ppichier"
                  birthday="05/18/1992"
                  nb={1}
                />
              </div>

              <div className="styleCard py-3 px-3 mx-3 my-3">
                <CardPicture
                  lastName="Pier'Antonio"
                  pseudo="Ppichier"
                  birthday="05/18/1992"
                />
              </div>

              <div className="styleCard py-3 px-3 mx-3 my-3">
                <CardPicture
                  lastName="Pier'Antonio"
                  pseudo="Ppichier"
                  birthday="05/18/1992"
                />
              </div>

              <div className="styleCard py-3 px-3 mx-3 my-3">
                <CardPicture
                  lastName="Pier'Antonio"
                  pseudo="Ppichier"
                  city="Paris"
                  birthday="05/18/1992"
                />
              </div>

              <div className="styleCard py-3 px-3 mx-3 my-3">
                <CardPicture
                  lastName="Pier'Antonio"
                  pseudo="Ppichier"
                  city="Paris"
                  birthday="05/18/1992"
                />
              </div>
              <div className="styleCard py-3 px-3 mx-3 my-3">
                <CardPicture
                  lastName="Pier'Antonio"
                  pseudo="Ppichier"
                  city="Paris"
                  birthday="05/18/1992"
                />
              </div>

              <div className="styleCard py-3 px-3 mx-3 my-3">
                <CardPicture
                  lastName="Pier'Antonio"
                  pseudo="Ppichier"
                  city="Paris"
                  birthday="05/18/1992"
                />
              </div>

              <div className="styleCard py-3 px-3 mx-3 my-3">
                <CardPicture
                  lastName="Pier'Antonio"
                  pseudo="Ppichier"
                  city="Paris"
                  birthday="05/18/1992"
                />
              </div>

              <div className="styleCard py-3 px-3 mx-3 my-3">
                <CardPicture
                  lastName="Pier'Antonio"
                  pseudo="Ppichier"
                  city="Paris"
                  birthday="05/18/1992"
                />
              </div>

              <div className="styleCard py-3 px-3 mx-3 my-3">
                <CardPicture
                  lastName="Pier'Antonio"
                  pseudo="Ppichier"
                  city="Paris"
                  birthday="05/18/1992"
                />
              </div>

              <div className="styleCard py-3 px-3 mx-3 my-3">
                <CardPicture
                  lastName="Pier'Antonio"
                  pseudo="Ppichier"
                  city="Paris"
                  birthday="05/18/1992"
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
