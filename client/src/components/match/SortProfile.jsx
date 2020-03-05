import React, { Fragment } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";

const SortProfile = () => {
  return (
    <Fragment>
      <DropdownButton
        id="dropdown-basic-button"
        title="Dropdown button"
        variant="outline-info"
        className="style-menu px-4 py-4 my-3 mt-1"
      >
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton>
    </Fragment>
  );
};
export default SortProfile;
