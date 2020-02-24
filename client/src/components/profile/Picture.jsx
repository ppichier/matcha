import React, { useState, Fragment } from "react";
import "./Picture.css";
import { uploadImage } from "../../api/";
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
      // "https://miro.medium.com/max/700/1*-e9ggCgUcu3_9OdKhX9g5g.jpeg",
      // "https://www.bigstockphoto.com/images/homepage/module-6.jpg",
      // "https://miro.medium.com/max/700/1*eukbB4_M_hFVlARuE_EaTQ.jpeg",
      // "https://miro.medium.com/max/1600/1*F5TxJsQZ9QDfPKeyw7ClTA.jpeg",
      // "https://miro.medium.com/max/700/1*0dWe2qDwWKQt9wuVnMXJ-w.jpeg"
    ],
    uploading: false
  });

  const handleChange = event => {
    const files = Array.from(event.target.files);

    files.forEach((file, i) => {
      values.formData.set("photo" + (i + 1), files[i]);
      values.formData.set("nbr_images", i++);
    });

    const jwt = JSON.parse(localStorage.getItem("jwt"));
    values.formData.set("userUuid", jwt.user._id);
    console.log(values.formData);
    uploadImage(values.formData)
      .then(data => {
        // setValues({ ...values, base64Images: data.images, uploading: false });
      })
      .catch(err => console.log(err));
  };

  const removeImage = id => () => {
    const path_image = [...values.base64Images];
    path_image.splice(id, 1);
    setValues({ ...values, base64Images: path_image });
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
            <img className="img" src={values.base64Images[i]} alt="" />
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
