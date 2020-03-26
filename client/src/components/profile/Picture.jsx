import React, { useState, Fragment, useEffect } from "react";
import "./Picture.css";
import {
  uploadSecondaryImages,
  deleteSecondaryImage,
  readSecondaryImages
} from "../../api/user";
import { Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImages,
  faTimesCircle,
  faBowlingBall
} from "@fortawesome/free-solid-svg-icons";

const Picture = ({ imageSecondarySet }) => {
  const [values, setValues] = useState({
    formData: new FormData(),
    uploading: false,
    err: "",
    msg: ""
  });

  const [base64Images, setBase64Images] = useState(["", "", "", ""]);

  useEffect(() => {
    readSecondaryImages()
      .then(data => {
        if (!data || data.err) return;
        setBase64Images(data.images);
      })
      .catch(err => console.log(err));
  }, []);

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
        if (data.err) {
          setValues({ ...values, err: data.err });
        } else {
          setValues({
            ...values,
            uploading: false,
            msg: data.msg
          });
          if (data.images.length > 0) imageSecondarySet(true);
          setBase64Images(data.images);
        }
      })
      .catch(err => console.log(err));
  };

  const removeImage = id => () => {
    const path_image = [...base64Images];
    path_image[id] = "";
    deleteSecondaryImage({ imageIdRemove: id })
      .then(() => {
        if (path_image.filter(e => e !== "").length === 0)
          imageSecondarySet(false);
        else imageSecondarySet(true);
        setBase64Images(path_image);
        setValues({ ...values });
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
      case base64Images.filter(e => e !== "").length === 0:
        return (
          <Fragment>
            <Col>
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
      case base64Images.length > 0:
        return base64Images.map((image, i) => {
          if (image !== "")
            return (
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
            );
          else return <Fragment key={i}></Fragment>;
        });

      default:
    }
  };
  return <div className="buttons">{content()}</div>;
};

export default Picture;
