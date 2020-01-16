import React, { useState, Fragment } from "react";
import NavbarHeader from "../navbar/Navbar";
import Picture from "./Picture";
import BodyProfile from "./BodyProfile";
import { Container, Row, Col } from "react-bootstrap";
import "./Profile.css";

const Profile = () => {
  const readState = state => {
    //fetch state
    console.log("je suis parent avec: ", state);
  };

  return (
    <Fragment>
      <NavbarHeader />
      <Row className="pt-5 px-3">
        <Col md={4}>
          <Picture />
        </Col>
        <Col md={8}>
          <BodyProfile handleSubmit={state => readState(state)} />
        </Col>
      </Row>
    </Fragment>
  );
};
export default Profile;
