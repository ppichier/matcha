import React, { useState, Fragment } from "react";
import "./CardPicture.css";
import { Row, Container, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { cardPicture } from "../../api/";

const CardPicture = ({ pseudo, lastName, city, birthday, nb }) => {
  const [values, setValues] = useState({
    image: [],
    uploading: false,
    imagePath: ""
  });
  const handleChange = event => {
    event.preventDefault();

    const files = Array.from(event.target.files);
    const tmp = { ...values, image: [...values.image, files] };
    const formData = new FormData();

    // files.forEach((file, i) => {
    formData.append(0, files);
    // });
    cardPicture(formData)
      .then(path => {
        setValues({ ...values, imagePath: path, uploading: false });
      })
      .catch(err => console.log(err));
    setValues(tmp);
  };
  // const age = birthday => {
  //   birthday = new Date(birthday);
  //   return ((new Date().getTime() - birthday.getTime()) / 31536000000).toFixed(
  //     0
  //   );
  // };
  const isShow = birthday => {
    if (birthday) return <div>Age: {birthday} ans</div>;
  };
  const cardProfile = () => {
    if (nb === 1) {
      return (
        <Fragment>
          <Container>
            <Row>
              <div className="profile-header-container">
                <a href="/profile">
                  <div>
                    <Image
                      className="profile-header-img"
                      src="https://thumbs.dreamstime.com/b/beau-profil-du-c%C3%B4t%C3%A9-front-s-de-femme-109059081.jpg"
                      roundedCircle
                    />
                    <div className="rank-label-container">
                      <span className="label label-default rank-label">
                        100{" "}
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
                      <div className="desc">{city}</div>
                    </div>
                  </div>
                </a>
              </div>
            </Row>
          </Container>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Container>
            <Row>
              <div className="profile-header-container">
                <div>
                  <label htmlFor="single">
                    <Image
                      className="profile-header-img"
                      src="https://thumbs.dreamstime.com/b/beau-profil-du-c%C3%B4t%C3%A9-front-s-de-femme-109059081.jpg"
                      roundedCircle
                    />
                  </label>
                  <div className="rank-label-container">
                    <span className="label label-default rank-label">
                      100{" "}
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
                  <input
                    type="file"
                    name="file"
                    id="single"
                    onChange={handleChange}
                  />
                  <div className="info">
                    <div className="pt-2">
                      <h4>{lastName}</h4>
                    </div>
                    <div className="desc">{pseudo}</div>
                    <div className="desc">{isShow(birthday)}</div>
                    <div className="desc">{city}</div>
                  </div>
                </div>
              </div>
            </Row>
          </Container>
        </Fragment>
      );
    }
  };
  return <Fragment>{cardProfile()}</Fragment>;
};
export default CardPicture;
