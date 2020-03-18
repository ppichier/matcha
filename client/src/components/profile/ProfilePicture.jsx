import React, { useState, Fragment, useEffect } from "react";
import "./ProfilePicture.css";
import { Row, Container, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import {
  uploadProfileImage,
  deleteProfileImage,
  readImage
} from "../../api/user";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const ProfilePicture = ({ pseudo, firstName, birthday, imageProfileSet }) => {
  const [values, setValues] = useState({
    uploading: false,
    formData: new FormData(),
    err: "",
    msg: ""
  });

  const [base64Image, setBase64Image] = useState("");

  useEffect(() => {
    readImage()
      .then(data => {
        setBase64Image(data.image);
      })
      .catch(err => console.log(err));
  }, [base64Image]);

  const handleChange = event => {
    const value = event.target.files[0];
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    if (value !== undefined) {
      imageProfileSet(true);
      values.formData.set("photo", value);
      values.formData.set("userUuid", jwt.user._id);
      uploadProfileImage(values.formData)
        .then(data => {
          if (data.err) {
            setValues({ ...values, err: data.err });
          } else {
            setValues({ ...values, msg: data.msg });
            setBase64Image(data.image);
          }
        })
        .catch(err => console.log(err));
    }
  };

  const removeImage = () => {
    imageProfileSet(false);
    deleteProfileImage()
      .then(() => {
        setBase64Image("");
      })
      .catch(err => console.log(err));
  };

  const handleImage = () => {
    if (base64Image) {
      return (
        <div style={{ position: "relative" }}>
          <div onClick={removeImage} className="delete">
            <FontAwesomeIcon icon={faTimesCircle} size="1x" />
          </div>
          <label htmlFor="single" className="imgProfile mb-0">
            <Image
              className="profile-header-img"
              src={"data:image/png;base64, " + base64Image}
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
    if (birthday >= 18) return <div>Age: {birthday} ans</div>;
  };

  return (
    <Fragment>
      <Container>
        <Row style={{ justifyContent: "center" }}>
          <div className="profile-header-container">
            <div>
              {handleImage()}
              <div className="rank-label-container">
                <span className="label label-default rank-label">
                  100{" "}
                  <FontAwesomeIcon
                    icon={faStar}
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
                  <h4>{firstName}</h4>
                </div>
                <div className="desc">{pseudo}</div>
                <div className="desc">{isShow(birthday)}</div>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ProfilePicture;
