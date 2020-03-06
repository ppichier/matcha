import React, { useState, Fragment, useEffect } from "react";
import "./CardPicture.css";
import { Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { readImage } from "../../api/";

const CardPicture = ({ pseudo, lastName, birthday }) => {
  const [base64Image, setBase64Image] = useState("");

  useEffect(() => {
    readImage()
      .then(data => {
        setBase64Image(data.image);
      })
      .catch(err => console.log(err));
  }, [base64Image]);

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
  };

  const isShow = birthday => {
    if (birthday >= 18) return <div>Age: {birthday} ans</div>;
  };
  return (
    <Fragment>
      <div className="profile-header-container">
        <a href="/profile">
          <div>
            {handleImage()}
            <div className="rank-label-container">
              <span className="label label-default rank-label">
                1000{" "}
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
              <div>{lastName}</div>
              <div className="desc">{pseudo}</div>
              <div className="desc">{isShow(birthday)}</div>
            </div>
          </div>
        </a>
      </div>
    </Fragment>
  );
};

export default CardPicture;
