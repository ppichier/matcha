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
    profiles: []
  });

  useEffect(() => {
    firstFilter().then(data => {
      console.log(data);
      setValues({ ...values, profiles: data.profiles });
    });
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
            firstName={profile.firstName}
            pseudo={profile.pseudo}
            age={profile.age}
            score={profile.score}
            userUuid={profile.userUuid} //change dynamic in URL
            distance={profile.distance}
          />
        </div>
      );
    });
  };

  return (
    <Fragment>
      <NavbarHeader />
      <Container fluid className="mt-3">
        <Row>
          <Col md={3}>
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
