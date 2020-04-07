import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CardPicture.css";
import { Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { readImage } from "../../api/user";

const CardPicture = ({ pseudo, firstName, age, score, distance, userUuid }) => {
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
              <div style={{ fontWeight: "600" }} className="pt-1">
                {firstName}
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
