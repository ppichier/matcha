import React, { useState, Fragment, useEffect } from "react";
import "./CardPicture.css";
import { Row, Col, Container, Button } from "react-bootstrap";
import CardPicture from "./CardPicture";
import NavbarHeader from "../navbar/Navbar";
import FilterProfile from "./FilterProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "rc-slider/assets/index.css";
import "./MatchMe.css";
import SortProfile from "./SortProfile";
import { firstFilter, heartClick } from "../../api";

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

  const onHeartClick = i => {
    let userLiked = {
      userUuid: "",
      isLiked: 0
    };
    let newProfiles = values.profiles.map((profile, j) => {
      if (i === j) {
        profile.isLiked = !profile.isLiked;
        userLiked.userUuid = profile.userUuid;
        userLiked.isLiked = profile.isLiked;
        return profile;
      } else return profile;
    });
    heartClick(userLiked).then(() => {
      setValues({ ...values, profiles: newProfiles });
    });
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
          <div className="heart-container mb-2 mr-2">
            <Button
              variant={profile.isLiked ? "danger" : "outline-secondary"}
              onClick={() => onHeartClick(i)}
              style={{
                border: "2px solid",
                borderRadius: "50%",
                width: "50px",
                height: "50px"
              }}
            >
              <FontAwesomeIcon icon={faHeart} />
            </Button>
          </div>
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
          <Col>
            <Row style={{ justifyContent: "center" }}>{card()}</Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default MatchMe;
