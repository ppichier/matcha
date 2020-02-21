import React, { useState, Fragment, useEffect } from "react";
import "./CardPicture.css";
import { Row, Container, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { uploadImage, readImage } from "../../api/";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
const CardPicture = ({ pseudo, lastName, city, birthday, nb }) => {
  const [values, setValues] = useState({
    uploading: false,
    pathImage: "",
    formData: "",
    photo: ""
  });

  const init = () => {
    setValues({ ...values, formData: new FormData() });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = event => {
    const value = event.target.files[0];
    values.formData.set("photo", value);
    // setValues({ ...values, photo: value });
    uploadImage(values.formData)
      .then(data => {
        console.log(data);
        setValues({ ...values, pathImage: data.image });
      })
      .catch(err => console.log(err));
  };
  const removeImage = () => {
    setValues({ ...values, pathImage: "" });
  };
  const handleImage = () => {
    if (values.pathImage) {
      return (
        <div style={{ position: "relative" }}>
          <div onClick={removeImage} className="delete">
            <FontAwesomeIcon icon={faTimesCircle} size="1x" />
          </div>
          <label htmlFor="single" className="imgProfile mb-0">
            <Image
              className="profile-header-img"
              src={"data:image/png;base64, " + values.pathImage}
              roundedCircle
            />
          </label>
        </div>
      );
    } else {
      return (
        <label htmlFor="single" className="mb-0">
          <Image
            className="profile-header-img"
            src={"https://image.flaticon.com/icons/png/512/1177/1177577.png"}
            roundedCircle
          />
        </label>
      );
    }
  };

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
                      src={values.path}
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
                  {handleImage()}
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
