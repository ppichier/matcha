import React, { useState, Fragment, useEffect } from "react";
import { Carousel, Container, Row, Col, Badge, Form } from "react-bootstrap";
import { useParams, Redirect } from "react-router-dom";
import "./Profile.css";
import "./ProfileUser.css";
import CardPicture from "../match/CardPicture";
import NavbarHeader from "../navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { readGuestProfile, readSecondaryImages, userBlocked,  userReport} from "../../api/user";
import {heartClick} from "../../api";
import CustomSpinner from "../auth/Spinner";
import moment from "moment";
import iconProfile from '../../images/imgIconProfil.png';

import {
  faHeart,
  faComment,
  faCommentDots,
  faUserSlash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Profile = ({ location, socket }) => {
  const [values, setValues] = useState({
    indexImages: 0,
    directionImages: null,
  });
  const [currentUuid, setCurrentUuid] = useState("");
  const [infoSeconder, setInfoSeconder] = useState({
    userReport: "",
    userBlocked: "",
    logout: "",
    like: "",
    likeMe: "",
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
    score: "",
    distance: "",
    myTags: [],
    redirect: false,
    loading: true,
  });

  let { id } = useParams();
  const fetchData = async () => {
    try {
      const data = await readGuestProfile(id);
      if (data.err) {
        setInfosUser({ ...infosUser, loading: false, redirect: true });
      } else {
        const uuid = JSON.parse(localStorage.getItem("jwt")).user._id;
        socket.emit("visit", uuid, id, () => {});
        socket.on("online", () => {
          console.log(`${id} est en ligne`);
        });
        // return socket  clean after render !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        socket.on("offline", () => {
          console.log(`${id} est hors ligne`);
        });
        setInfosUser({ ...data.dataUser, loading: false });
        setInfoSeconder({ ...data.dataLike});
        setCurrentUuid();
        const secImg = await readSecondaryImages(id); // SECONDARY UUID NOT IMPLEMENTED
        if (secImg.err) {
          // return;
        } else {
          setBase64Images(secImg.images);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!id) {
      setInfosUser({ ...infosUser, redirect: true });
    } else {
      fetchData();
    }
  }, [id]);

  const handleSelect = (selectedIndex, e) => {
    const tmp = {
      ...values,
      indexImages: selectedIndex,
      directionImages: e.direction,
    };
    setValues(tmp);
  };

  const isUserBlocked = (i) => {
    setInfoSeconder({ ...infoSeconder, userBlocked: i });
    userBlocked({
       userUuid: id,
      userBlocked: i,
    }).then(() => {});  
  };

const onHeartClick = (i) => {
  if(infoSeconder.userBlocked !== 1)
  {
    setInfoSeconder({ ...infoSeconder, like: i });
    let userLiked = {
      userUuid: id,
      isLiked: i,
    }
    heartClick(userLiked).then(() => {});  
  }
};

  const handleIconLike = () => {
    if (infoSeconder.like === 1)
      return (
        <FontAwesomeIcon
          icon={faHeart}
           className="fa-2x faHeartLiked"
          onClick={() => onHeartClick(0)}
        
        />
      );
    else if(infoSeconder.like === 0 && infoSeconder.likeMe === 1)
      return (
        <FontAwesomeIcon
          icon={faHeart}
          className="fa-2x faHeartLikeMe"
          onClick={() => onHeartClick(1)}
        />
      );
    else
      return (
        <FontAwesomeIcon
          icon={faHeart}
          className="fa-2x faHeart"
          onClick={() => onHeartClick(1)}
        />
      );
  };

   const handleIconChat = () => {
    if (infoSeconder.likeMe === 1  && infoSeconder.like === 1)
      return (
        <FontAwesomeIcon
          icon={faCommentDots} 
          className="fa-2x faComment" 
          onClick={event =>  window.location.href='/chat'}  
        />
      );
    else
      return (
        <FontAwesomeIcon
          icon={faComment} 
          className="fa-2x "
        />
      );
  };
        
  const handleUserBlocked = () => {
    if (infoSeconder.userBlocked === 1)
      return (
        <FontAwesomeIcon
          icon={faUserSlash}
          className="fa-2x faUserBlocked"
          onClick={() => isUserBlocked(0)}
        />
      );
    else
      return (
        <FontAwesomeIcon
          icon={faUser}
          className="fa-2x"
          onClick={() => isUserBlocked(1)}
        />
      );
  };

  const handleImages = () => {
    if(base64Images.length > 0)
      return base64Images
        .filter((e) => e !== "")
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
    else
          return (
            <Carousel.Item>
              <img
                className="d-block w-100 image"
                src={iconProfile} 
                alt="First slide"
              />
         </Carousel.Item>
        );
  };

  const handleUserReport = (e) =>{
    let fakeAccount = (e.target.checked === true) ?  1 : 0
    setInfoSeconder({ ...infoSeconder, userReport: e.target.checked});
    userReport({
      userUuid: id,
      userReport: fakeAccount
    }).then(() => {});  
  }

  const showAge = () => {
    if (infosUser.age >= 18) return <Fragment> {infosUser.age} ans</Fragment>;
  };

  const convGender = () => {
    if (infosUser.gender === 1) return " un Homme";
    if (infosUser.gender === 2) return " une Femme";
    if (infosUser.gender === 3) return " un Transmasculin";
    if (infosUser.gender === 4) return " une Transféminine";
    if (infosUser.gender === 5 || infosUser.gender === 6) return " Bigenre";
    else return "";
  };
  const convSexualPtoString = () => {
    if (infosUser.sexualPreference === 1) return " un Homme ";
    else if (infosUser.sexualPreference === 2) return " une Femme ";
    else if (infosUser.sexualPreference === 3) return " un Transmasculin ";
    else if (infosUser.sexualPreference === 4) return " une Transféminine ";
    else if (infosUser.sexualPreference === 5 || infosUser.sexualPreference === 6) return " Bigenre ";
    else return "";
  };

  const redirectUser = () => {
    if (infosUser.loading) {
      return <CustomSpinner />;
    } else if (infosUser.redirect) {
      return <Redirect to={"/404notfound"} />;
    } else {
      return (
        <Fragment>
          <NavbarHeader />
          <Container className="my-4">
            <Row>
              <Col md={4} className="mt-5 ">
                <Row>
                  <Col>
                    <Row className="row-pictureProfile mt-4 py-3"  style={{ justifyContent: "center" }}>
                      <CardPicture
                        className="styleCard"
                        firstName={infosUser.firstName}
                        lastName={infosUser.lastName}
                        pseudo={infosUser.pseudo}
                        age={infosUser.age}
                        stateConnection={infoSeconder.logout ? moment(infoSeconder.logout).fromNow() : 'en ligne'}
                        score={infosUser.score}
                        distance={infosUser.distance}
                        userUuid={id}
                      />
                    </Row>
                    <Row
                      className="Row mt-4 py-3"
                      style={{
                        justifyContent: "space-around",
                        flexWrap: "wrap",
                        padding: "0 10%",
                      }}
                    >
                      {handleIconLike()}
                      {handleIconChat()}
                      {handleUserBlocked()}
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col md={8} className="pl-5 mt-5">
                <Carousel
                  activeIndex={values.indexImages}
                  direction={values.directionImages}
                  onSelect={handleSelect}
                  className="mt-4"
                >
                  {handleImages()}
                </Carousel>

                <Row className="mb-4 pt-3 pb-4 mt-4 Row">
                  <Col>
                    <p className="descp">
                      Je suis {convGender()}, je cherche
                      {convSexualPtoString()} .
                      {showAge()}
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
                    checked={infoSeconder.userReport}
                    label="Signaler un faux compte"
                    onChange={(e) => handleUserReport(e)}
                  />
                </Form>
              </Col>
            </Row>
          </Container>
        </Fragment>
      );
    }
  };

  return <Fragment>{redirectUser()}</Fragment>;
};

export default Profile;
