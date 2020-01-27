import React, { useState, Fragment } from "react";
import "./CardPicture.css";
import { Row, Container, Image } from "react-bootstrap";
import { cardPicture } from "../../api/auth";

const CardPicture = ({ firstName, lastName, city, birthday }) => {
  const [values, setValues] = useState({
    image: [],
    uploading: false
  });
  const handleChange = event => {
    event.preventDefault();

    const files = Array.from(event.target.files);
    const tmp = { ...values, image: [...values.image, files] };
    const formData = new FormData();

    files.forEach((file, i) => {
      formData.append(i, files);
    });
    //   profile({
    //     formData
    //   })
    //     .then(images => {
    //         setValues({ ...values, images: images, uploading: false })
    //       })
    //     .catch(err => console.log(err));
    // };
    setValues(tmp);
  };
  const age = birthday => {
    birthday = new Date(birthday);
    return new Number(
      (new Date().getTime() - birthday.getTime()) / 31536000000
    ).toFixed(0);
  };
  const isShow = birthday => {
    if (birthday) return <div>Age: {age(birthday)}</div>;
  };
  return (
    <Fragment>
      <Container>
        <Row>
          <div className="profile-header-container">
            <div className="profile-header-img">
              <label htmlFor="single">
                <Image
                  src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120"
                  roundedCircle
                />
              </label>
              <div className="rank-label-container">
                <span className="label label-default rank-label">
                  100♥️♥️♥️
                </span>
              </div>
              <input
                type="file"
                name="file"
                id="single"
                onChange={handleChange}
              />
              <div className="info">
                <a>
                  {firstName} {lastName}
                </a>
                <div className="desc">{isShow(birthday)}</div>
                <div className="desc">{city}</div>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </Fragment>
  );
};
export default CardPicture;
