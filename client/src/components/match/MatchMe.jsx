import React, { useState, Fragment, useEffect } from "react";
import "./CardPicture.css";
import { Row, Col, Container } from "react-bootstrap";
import CardPicture from "./CardPicture";
import NavbarHeader from "../navbar/Navbar";
import FilterProfile from "./FilterProfile";
import Slider, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import "./MatchMe.css";
import SortProfile from "./SortProfile";
import { firstFilter } from "../../api";

// one fetch for list of profiles
// x fetch for x images

const MatchMe = ({ pseudo, lastName, city, birthday }) => {
  const [values, setValues] = useState({
    image: [],
    uploading: false,
    profiles: [
      {
        pseudo: "ppichier",
        firstName: "Pier'Antonio",
        popularity: 100,
        age: 28
      },
      {
        pseudo: "ppichier",
        firstName: "Pier'Antonio",
        popularity: 100,
        age: 28
      },
      {
        pseudo: "ppichier",
        firstName: "Pier'Antonio",
        popularity: 100,
        age: 28
      },
      {
        pseudo: "ppichier",
        firstName: "Pier'Antonio",
        popularity: 100,
        age: 28
      }
    ]
  });
  useEffect(() => {
    firstFilter();
  }, []);
  const handleChange = event => {
    event.preventDefault();

    const files = Array.from(event.target.files);
    const tmp = { ...values, image: [...values.image, files] };
    // const formData = new FormData();
    setValues(tmp);
  };

  const card = () => {
    return values.profiles.map((profile, i) => {
      return (
        <div className="styleCard py-3 px-3 mx-3 my-3" key={i}>
          <CardPicture
            lastName="Pier'Antonio"
            pseudo={profile.pseudo}
            birthday="05/18/1992"
          />
        </div>
      );
    });
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
            <Row style={{ justifyContent: "center" }}>{card()}</Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default MatchMe;
