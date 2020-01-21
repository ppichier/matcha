import React, { useState, Fragment } from "react";
import "./Picture.css";
import { Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImages,
  faImage,
  faTimesCircle,
  faBowlingBall,
  faFileImage
} from "@fortawesome/free-solid-svg-icons";

const Picture = () => {
  const [values, setValues] = useState({
    images: [],
    path: [
      "https://miro.medium.com/max/700/1*-e9ggCgUcu3_9OdKhX9g5g.jpeg",
      "https://www.bigstockphoto.com/images/homepage/module-6.jpg",
      "https://miro.medium.com/max/700/1*eukbB4_M_hFVlARuE_EaTQ.jpeg",
      "https://miro.medium.com/max/1600/1*F5TxJsQZ9QDfPKeyw7ClTA.jpeg",
      "https://miro.medium.com/max/700/1*0dWe2qDwWKQt9wuVnMXJ-w.jpeg"
    ],
    uploading: false
  });
  const handleChange = event => {
    event.preventDefault();

    // this.setState({ uploading: true })
    const files = Array.from(event.target.files);
    const tmp = { ...values, images: [...values.images, files] };
    const formData = new FormData();

    files.forEach((file, i) => {
      formData.append(i, files);
    });

    setValues(tmp);
  };

  const removeImage = id => () => {
    console.log(id);
    const path_image = [...values.path];
    path_image.splice(id, 1);
    setValues({ ...values, path: path_image });
  };
  const content = () => {
    switch (true) {
      case values.uploading:
        return (
          <div>
            <FontAwesomeIcon icon={faBowlingBall} size="5x" color="#3B5998" />
          </div>
        );
      case values.images.length > 0:
        return values.path.map((image, i) => (
          <div key={i} className="fadein">
            <div onClick={removeImage(i)} className="delete">
              <FontAwesomeIcon icon={faTimesCircle} size="2x" />
            </div>
            {console.log(i)}
            <img src={values.path[i]} alt="" />
          </div>
        ));
      default:
        return (
          <Fragment>
            <Col style={{}}>
              <div className="buttons fadein py-5">
                <div className="button">
                  <label htmlFor="single">
                    <FontAwesomeIcon
                      className="download-picture-icon"
                      icon={faImage}
                      color="#fad5c0"
                    />
                  </label>
                  <input
                    type="file"
                    name="file"
                    id="single"
                    onChange={handleChange}
                  />
                </div>
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
