import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CardPicture.css";
import { Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { readImage } from "../../api/user";

const CardPicture = ({ pseudo, firstName, age, score, userUuid }) => {
  const [base64Image, setBase64Image] = useState("");
  const [fakeImage, setFakeImage] = useState("");

  useEffect(() => {
    readImage(userUuid)
      .then(data => {
        if (data.image) setBase64Image(data.image);
        else if (data.imageFakeProfile) {
          setBase64Image("");
          setFakeImage(data.imageFakeProfile);
        }
      })
      .catch(err => console.log(err));
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

  const isShow = age => {
    if (age >= 18) return <div>Age: {age} ans</div>;
  };
  return (
    <Fragment>
      <div className="profile-header-container">
        <Link to={`/profile?uuid=${userUuid}`}>
          <div>
            {handleImage()}
            <div className="rank-label-container">
              <span className="label label-default rank-label">
                {score}
                <FontAwesomeIcon
                  icon={faHeart}
                  className="fa-lg mr-1 faHeartliked"
                />
                <FontAwesomeIcon
                  icon={faHeart}
                  className="fa-lg mr-1 faHeartliked"
                />
                <FontAwesomeIcon
                  icon={faHeart}
                  className="fa-lg mr-1 faHeartliked"
                />
              </span>
            </div>

            <div className="info">
              <div>{firstName}</div>
              <div className="desc">{pseudo}</div>
              <div className="desc">{isShow(age)}</div>
            </div>
          </div>
        </Link>
      </div>
    </Fragment>
  );
};

export default CardPicture;
