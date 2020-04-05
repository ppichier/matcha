import React, { useState, Fragment, useEffect } from "react";
import { Carousel, Container, Row, Col, Badge, Form } from "react-bootstrap";
import "./Profile.css";
import "./ProfileUser.css";
import CardPicture from "../match/CardPicture";
import NavbarHeader from "../navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { readGuestProfile, readSecondaryImages } from "../../api/user";
import queryString from "query-string";

import {
  faHeart,
  faComment,
  faUserSlash,
  faUser
} from "@fortawesome/free-solid-svg-icons";

const Profile = ({ location, history }) => {
  const [values, setValues] = useState({
    indexImages: 0,
    directionImages: null,
  });
  const [currentUuid, setCurrentUuid] = useState("");
  const [infoSeconder, setInfoSeconder] = useState({
    fakeCount: false,
    logout: null,
    like: 0,
    likeMe: 0
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
    myTags: [],
    redirect: false
  });

  useEffect(() => {
    const query = queryString.parse(location.search);
    if (!query.uuid) {
      setInfosUser({ ...infosUser, redirect: true });
      return;
    }
    setCurrentUuid(query.uuid);
    readSecondaryImages() // SECONDARY UUID NOT IMPLEMENTED
      .then(data => {
        setBase64Images(data.images);
      })
      .catch(err => console.log(err));

    readGuestProfile(query.uuid)
      .then(data => {
        if (data.err) {
          setInfosUser({ ...infosUser, redirect: true });
        } else {
          setInfosUser({ ...data.dataUser});
          setValues({...data.dataLike})
        }
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
    if (infoSeconder.fakeCount === false) tmp = { ...infoSeconder, fakeCount: true };
    else tmp = { ...infoSeconder, fakeCount: false };
    setValues(tmp);
  };

  const handleLike = () => {
    setInfoSeconder({...infoSeconder, like: !infoSeconder.like});
    // readGuestProfile({
    //   query.uuid,
    // })
    //   .then(data => {
    //     if (data.err) {
    //       setInfosUser({ ...infosUser, redirect: true });
    //     } else {
    //       setInfosUser({ ...data.dataUser});
    //       setValues({...data.dataLike})
    //     }
    //   })
    //   .catch(err => console.log(err));
  };

  const handleiconLike = () => {
    if (infoSeconder.like === 0)
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
    if (infosUser.age >= 18) return <Fragment> {infosUser.age} ans</Fragment>;
  };

  const convGender = () => {
    if (infosUser.gender === 1) return " un Homme";
    if (infosUser.gender === 2) return " une Femme";
    if (infosUser.gender === 3) return " un Transmasculin";
    if (infosUser.gender === 4) return " une Transféminine";
    if (infosUser.gender === 5) return " Bigenre";
    else return "";
  };
  const convSexualPtoString = () => {
    if (infosUser.sexualPreference === 1) return " un Homme ";
    else if (infosUser.sexualPreference === 2) return " une Femme ";
    else if (infosUser.sexualPreference === 3) return " un Transmasculin ";
    else if (infosUser.sexualPreference === 4) return " une Transféminine ";
    else if (infosUser.sexualPreference === 5) return " Bigenre ";
    else return "";
  };

  const redirectUser = () => {
    if (infosUser.redirect === true) {
      return <Fragment>Profile not valid</Fragment>;
    } else {
      return (
        <Fragment>
          <Carousel
            activeIndex={values.indexImages}
            direction={values.directionImages}
            onSelect={handleSelect}
            className="mt-5"
          >
            {handleImages()}
          </Carousel>

          <Row className="mb-4 pt-3 pb-4 mt-4 Row">
            <Col>
              <h3 className="descp">{infosUser.firstName}</h3>
              <p className="descp">
                Je suis {convGender()}, {isShow()}, je cherche
                {convSexualPtoString()} ...
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
        </Fragment>
      );
    }
  };

  return (
    <Fragment>
      {/* {redirectUser()} */}
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
                    userUuid={currentUuid}
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
            {redirectUser()}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Profile;

