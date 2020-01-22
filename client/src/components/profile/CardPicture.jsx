import React, { useState, Fragment } from "react";
import "./CardPicture.css";
import { Row, Container, Image } from "react-bootstrap";
const CardPicture = () => {
  return (
    <Fragment>
      <Container>
        <Row>
          <div className="profile-header-container">
            <div className="profile-header-img">
              <label htmlFor="profile">
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
                id="profile"
                // onChange={handleChange}
              />
              <div className="info">
                <a>Wafae Meddah</a>
                <div className="desc">Age: 30 ans</div>
                <div className="desc">Paris</div>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </Fragment>
  );
};
export default CardPicture;
