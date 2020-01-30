import React, { useState, Fragment } from "react";
import "../profile/CardPicture.css";
import "../profile/CardPicture";
import { Row, Col } from "react-bootstrap";
import CardPicture from "../profile/CardPicture";

const MatchMe = ({ pseudo, lastName, city, birthday }) => {
  const [values, setValues] = useState({
    image: [],
    uploading: false
  });
  const handleChange = event => {
    event.preventDefault();

    const files = Array.from(event.target.files);
    const tmp = { ...values, image: [...values.image, files] };
    const formData = new FormData();
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
      <Row>
        <Col>
          <CardPicture />
        </Col>{" "}
        <Col>
          <CardPicture />
        </Col>
        <Col>
          <CardPicture />
        </Col>
        <Col>
          <CardPicture />
        </Col>
        <Col>
          <CardPicture />
        </Col>
        <Col>
          <CardPicture />
        </Col>
        <Col>
          <CardPicture />
        </Col>
        <Col>
          <CardPicture />
        </Col>
        <Col>
          <CardPicture />
        </Col>
        <Col>
          <CardPicture />
        </Col>
        <Col>
          <CardPicture />
        </Col>
        <Col>
          <CardPicture />
        </Col>
        <Col>
          <CardPicture />
        </Col>
        <Col>
          <CardPicture />
        </Col>
        v
        <Col>
          <CardPicture />
        </Col>
        <Col>
          <CardPicture />
        </Col>
        <Col>
          <CardPicture />
        </Col>
        <Col>
          <CardPicture />
        </Col>
      </Row>
    </Fragment>
  );
};
export default MatchMe;
