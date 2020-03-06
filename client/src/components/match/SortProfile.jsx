import React, { Fragment } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Row, Col, Container } from "react-bootstrap";

const SortProfile = () => {
  return (
    <Fragment>
      <DropdownButton
        id="dropdown-basic-button"
        title="Dropdown button"
        variant="outline-info"
        className="style-menu px-4 py-4 my-3 mt-1"
      >
        <Dropdown.Item href="#/action-1">Du + jeune au + âgé</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Du + âgé au + jeune</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Du + près au + loin</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Du + loin au + près</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Du + tag en commun</Dropdown.Item>
        <Dropdown.Item href="#/action-3">
          Du + populaire au - populaire
        </Dropdown.Item>
        <Dropdown.Item href="#/action-3">
          Du - populaire au + populaire
        </Dropdown.Item>
      </DropdownButton>
    </Fragment>
  );
};
export default SortProfile;
