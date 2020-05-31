import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Container, Button, ButtonGroup } from "react-bootstrap";
import CardPicture from "./CardPicture";
import "./CardPicture.css";
import NavbarHeader from "../navbar/Navbar";
import FilterProfile from "./FilterProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "rc-slider/assets/index.css";
import "./MatchMe.css";
import SortProfile from "./SortProfile";
import { firstFilter, heartClick, filterProfile } from "../../api";
import _ from "lodash";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import { notificationAlert } from "../functions/notification";
import matchImage from "../../images/match.png";

const MatchMe = ({ socket }) => {
  const [values, setValues] = useState({
    profiles: [],
    resultsNumber: 0,
    activateFilter: false,
  });
  const [moreProfiles, setMoreProfiles] = useState([0, 0]);
  const [isShow, setIsShow] = useState("match");
  const [modalshow, setModalShow] = useState(false);
  const [moreParams, setMoreParams] = useState({
    age: [],
    userSize: [],
    location: [],
    score: [],
    selectedTags: [],
  });

  useEffect(() => {
    firstFilter(moreProfiles)
      .then((data) => {
        // console.log(data)
        if (!data) {
          notificationAlert("Server down", "danger", "bottom-center");
          return;
        } else if (data.err) {
          notificationAlert(data.err, "danger", "bottom-center");
          return;
        }
        if (isShow === "match" && data.stateProfile === "match") {
          setValues({
            ...values,
            profiles: data.profiles,
            resultsNumber: data.resultsNumber,
          });
          setIsShow("match");
        } else {
          if (data.stateProfile !== "match" && isShow === "search")
            notificationAlert(
              "Vous devez compléter votre profil à 60% minimum pour avoir le droit d'accès à la page match.",
              "danger",
              "bottom-center"
            );
          setIsShow("search");
          setValues({
            ...values,
            profiles: [],
            resultsNumber: 0,
            activateFilter: false,
          });
          document.getElementById("match").classList.remove("btn-active");
          document.getElementById("search").classList.add("btn-active");
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShow]);

  // const open_modal = (id) => {
  //   let e = document.getElementById('modals');
  //   if(id === "block")
  //   {
  //     e.style.display= "block"
  //   }
  //   else
  //     e.style.display = "none"
  // }
  const handleShow = (showParams) => {
    setIsShow(showParams);
    let btn = showParams === "match" ? "search" : "match";
    document.getElementById(btn).classList.remove("btn-active");
    document.getElementById(showParams).classList.add("btn-active");
  };

  const setFirstFilter = (event, moreProfiles) => {
    if (event) event.preventDefault();
    firstFilter(moreProfiles)
      .then((data) => {
        if (!data) {
          return;
        } else if (data.err) {
          notificationAlert(data.err, "danger", "bottom-center");
        } else {
          let profiles = values.profiles;
          profiles = profiles.concat(data.profiles);
          setValues({
            ...values,
            profiles: _.uniqBy(profiles, "pseudo"),
            resultsNumber: data.resultsNumber,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const setFilterParams = (event, filterParams, moreProfiles) => {
    if (event) event.preventDefault();
    filterProfile({
      age: filterParams.age,
      userSize: filterParams.userSize,
      location: filterParams.location,
      score: filterParams.score,
      selectedTags: filterParams.selectedTags,
      moreProfiles: moreProfiles,
      searchActif: isShow,
    })
      .then((data) => {
        if (!data) return;
        else if (data.err) {
          notificationAlert("Server down", "danger", "bottom-center");
          return;
        }
        if (moreProfiles[0] === 0) {
          setValues({
            ...values,
            profiles: data.profiles,
            resultsNumber: data.resultsNumber,
            activateFilter: true,
          });
          setMoreProfiles(moreProfiles);
          setMoreParams({
            ...moreParams,
            age: filterParams.age,
            userSize: filterParams.userSize,
            location: filterParams.location,
            score: filterParams.score,
            selectedTags: filterParams.selectedTags,
          });
        } else {
          let profiles = values.profiles;
          profiles = profiles.concat(data.profiles);
          setValues({
            ...values,
            profiles: _.uniqBy(profiles, "pseudo"),
            resultsNumber: data.resultsNumber,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const setSortParams = (sortParams) => (event) => {
    const profiles = _.orderBy(
      values.profiles,
      [sortParams.name],
      [sortParams.order]
    );
    setValues({ ...values, profiles });
  };

  const onMoreProfiles = (event) => {
    let moreProfilesTmp = moreProfiles.map((x) => x + 20);
    setMoreProfiles(moreProfilesTmp);
    if (values.activateFilter === true)
      setFilterParams(event, moreParams, moreProfilesTmp);
    else setFirstFilter(event, moreProfilesTmp);
  };

  const onHeartClick = (i, uuid) => {
    let newProfiles = [...values.profiles];
    let idx = newProfiles.findIndex((p) => p.userUuid === uuid);
    let userLiked = {
      userUuid: uuid,
      isLiked: !newProfiles[idx].isLiked,
    };
    heartClick(userLiked).then((data) => {
      if (!data) return;
      else if (data.err) {
        notificationAlert(data.err, "danger", "bottom-center");
      } else {
        newProfiles[idx].isLiked = userLiked.isLiked;
        if (newProfiles[idx].isLiked) {
          newProfiles[idx].score = newProfiles[idx].score + 10;
        } else newProfiles[idx].score = newProfiles[idx].score - 10;
        if (data.match) {
          setModalShow(true);
          const cardBorderAnimate = document.getElementById("card-" + i);
          const cardHeartAnimate = document.getElementById("heart-" + i);
          const classAnimate = ["heart-initial", "heart-animate"];
          cardBorderAnimate.classList.add("card-border-animate");
          cardHeartAnimate.classList.add(...classAnimate);
          setTimeout(() => {
            setModalShow(false);
            cardBorderAnimate.classList.remove("card-border-animate");
            cardHeartAnimate.classList.remove(...classAnimate);
          }, 3500);
        }
        setValues({ ...values, profiles: newProfiles });
      }
    });
  };

  const loadProfiles = () => {
    if (values.resultsNumber > 0 && values.resultsNumber > moreProfiles[1] + 20)
      return (
        <div style={{ width: "50%" }}>
          <Button
            onClick={(e) => onMoreProfiles(e)}
            className="text-uppercase mb-4 center-block"
            variant="outline-info"
            style={{
              letterSpacing: "1px",
              fontWeight: "bold",
              marginLeft: "50%",
            }}
          >
            <FontAwesomeIcon icon={faArrowAltCircleDown} className="fa-lg " />
            <i> Charger plus</i>
          </Button>
        </div>
      );
    else return <Fragment></Fragment>;
  };

  const card = () => {
    return values.profiles.map((profile, i) => {
      return (
        <div id={"card-" + i} className="styleCard py-3 px-3 mx-3 my-3" key={i}>
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
              variant={
                profile.likesMe || profile.isLiked
                  ? profile.isLiked
                    ? "danger"
                    : "info"
                  : "outline-secondary"
              }
              onClick={() => onHeartClick(i, profile.userUuid)}
              style={{
                border: "2px solid",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
              }}
            >
              <FontAwesomeIcon icon={faHeart} className="love" />
              {modalshow ? (
                <div id={"heart-" + i}></div>
              ) : (
                <Fragment></Fragment>
              )}
            </Button>
          </div>
        </div>
      );
    });
  };

  return (
    <Fragment>
      <NavbarHeader socket={socket} />
      <Container
        fluid
        className="mt-3"
        style={{ color: "#545454", position: "relative" }}
      >
        <Row>
          <Col md={3}>
            <SortProfile
              setSortParams={(sortParams) => setSortParams(sortParams)}
            />
            <FilterProfile
              setFilterParams={(filterParams) =>
                setFilterParams(null, filterParams, [0, 0])
              }
            />
          </Col>
          <Col>
            <ButtonGroup
              variant="outline-info"
              className="style-menu px-4 py-4 my-3 "
              style={{ width: "100%" }}
            >
              <Button
                variant="outline-info"
                className="btn-switsh btn-active"
                id="match"
                onClick={() => handleShow("match")}
              >
                Match
              </Button>
              <Button
                variant="outline-info"
                className="btn-switsh "
                id="search"
                onClick={() => handleShow("search")}
              >
                Recherche
              </Button>
            </ButtonGroup>
            <Row style={{ justifyContent: "center" }}>{card()}</Row>

            <div> {loadProfiles()} </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default MatchMe;
