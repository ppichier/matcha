import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CardPicture.css";
import { Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faToggleOn} from "@fortawesome/free-solid-svg-icons";
import { readImage } from "../../api/user";

const CardPicture = ({ pseudo, firstName, lastName, age, stateConnection, score, distance, userUuid }) => {
  const [base64Image, setBase64Image] = useState("");
  const [fakeImage, setFakeImage] = useState("");

  useEffect(() => {
    readImage(userUuid)
      .then((data) => {
        if (data.image) setBase64Image(data.image);
        else if (data.imageFakeProfile) {
          setBase64Image("");
          setFakeImage(data.imageFakeProfile);
        }
      })
      .catch((err) => console.log(err));
  }, [base64Image, userUuid]);

  let stateConnectionUser = (stateConnection) ? (stateConnection) : ""

  const handleImage = () => {
    if (base64Image) {
      return (
        <div>
          <label htmlFor="single" className="imgProfile mb-0">
            <Image
              className="profile-header-img"
              src={"data:image/png;base64, " + base64Image}
              roundedCircle
            />
          </label>
        </div>
      );
    }
    if (fakeImage) {
      return (
        <div>
          <label htmlFor="single" className="imgProfile mb-0">
            <Image
              className="profile-header-img"
              src={fakeImage}
              roundedCircle
            />
          </label>
        </div>
      );
    }
  };
  const handleConnection = () => {
    if(stateConnectionUser === "en ligne")
     return( <div style={{color: "#32CD32"}}>
      <FontAwesomeIcon
          icon={faToggleOn}
        />
      <Fragment>{stateConnectionUser}</Fragment>
      </div>);
    else if(stateConnectionUser)
      return(<div style={{color: "#D3D3D3"}}>
      <FontAwesomeIcon
          icon={faToggleOn}
        />
      <Fragment>{"En ligne " + stateConnectionUser}</Fragment>
      </div>);
  }

  const isShow = (age) => {
    if (age >= 18) return <div>{age} ans</div>;
    else return <Fragment />;
  };
  return (
    <Fragment>
      <div className="profile-header-container">
        <Link
          to={`/profile/${userUuid}`}
          style={{
            color: "grey",
            fontWeight: "500",
            textDecoration: "none",
          }}
        >
          <div>
            {handleImage()}
            <div className="rank-label-container">
              <span className="label label-default rank-label">
                {score}
                <FontAwesomeIcon
                  icon={faStar}
                  className="ml-2 popularity-icon"
                />
              </span>
            </div>
            <div className="pt-3">
            {handleConnection()}
              <div style={{ fontWeight: "600" }} className="pt-1">
                {firstName} {lastName}
              </div>
              <div className="desc pt-1">{pseudo}</div>
              <div className="desc pt-1">{isShow(age)}</div>
              <div className="desc pt-1">à {distance} km</div>
            </div>
          </div>
        </Link>
      </div>
    </Fragment>
  );
};

export default CardPicture;
