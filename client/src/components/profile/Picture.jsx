import React, { useState, Fragment } from "react";
import "./Picture.css";
import { uploadSecondaryImages, deleteSecondaryImage } from "../../api/";
import { Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImages,
  faTimesCircle,
  faBowlingBall
} from "@fortawesome/free-solid-svg-icons";

const Picture = () => {
  const [values, setValues] = useState({
    formData: new FormData(),
    base64Images: [
      //image1
    ],
    uploading: false,
    err: "",
    msg: ""
  });

  const handleChange = event => {
    const files = Array.from(event.target.files);

    // TODO aficher msg or err
    if (files.length >= 5) {
      setValues({ ...values, err: "Vous pouvez upload 5 photos maximum" });
      return;
    }

    files.forEach((file, i) => {
      values.formData.set("photo" + i, files[i]);
      values.formData.set("nbr_images", i++);
    });

    const jwt = JSON.parse(localStorage.getItem("jwt"));
    values.formData.set("userUuid", jwt.user._id);
    uploadSecondaryImages(values.formData)
      .then(data => {
        setValues({
          ...values,
          base64Images: data.images,
          uploading: false,
          msg: data.msg
        });
      })
      .catch(err => console.log(err));
  };

  const removeImage = id => () => {
    console.log(id);
    const path_image = [...values.base64Images];
    path_image.splice(id, 1);
    deleteSecondaryImage({ imageIdRemove: id })
      .then(() => {
        setValues({ ...values, base64Images: path_image });
      })
      .catch(err => {
        console.log(err);
      });
  };
  const content = () => {
    switch (true) {
      case values.uploading:
        return (
          <div>
            <FontAwesomeIcon icon={faBowlingBall} size="5x" color="#3B5998" />
          </div>
        );
      case values.base64Images.length > 0:
        return values.base64Images.map((image, i) => (
          <div key={i} className="fadein">
            <div onClick={removeImage(i)} className="">
              <FontAwesomeIcon icon={faTimesCircle} size="2x" />
            </div>
            <img
              className="img"
              src={"data:image/png;base64, " + image}
              alt=""
            />
          </div>
        ));
      default:
        return (
          <Fragment>
            <Col style={{}}>
              <div className="buttons fadein py-5">
                <div className="button">
                  <label htmlFor="multi">
                    <FontAwesomeIcon
                      className="download-picture-icon"
                      icon={faImages}
                      color="#fad5c0"
                    />
                  </label>
                  <input
                    type="file"
                    name="file"
                    id="multi"
                    onChange={handleChange}
                    multiple
                  />
                </div>
              </div>
            </Col>
          </Fragment>
        );
    }
  };
  return <div className="buttons">{content()}</div>;
};

export default Picture;
