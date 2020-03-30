import React, { Fragment} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {ToggleButtonGroup, ToggleButton } from "react-bootstrap";

const SortProfile = ({ setSortParams }) => {
  return (
    <Fragment>
      <DropdownButton
        id="dropdown-basic-button"
        title="Trier"
        variant="outline-info"
        className="style-menu px-4 py-4 my-3 mt-1"
      >
        <Dropdown.Item value="1" onClick={setSortParams({name: "age", order: "asc"})}>
          Du + jeune au + âgé
        </Dropdown.Item>
        <Dropdown.Item value="2" onClick={setSortParams({name: "age", order: "desc"})}>
          Du + âgé au + jeune
        </Dropdown.Item>
        <Dropdown.Item value="3" onClick={setSortParams({name: "distance", order: "desc"})}>
          Du + loin au + près
        </Dropdown.Item>
        <Dropdown.Item value="4" onClick={setSortParams({name: "distance", order: "asc"})}>
          Du + près au + loin
        </Dropdown.Item>
        <Dropdown.Item value="5" onClick={setSortParams({name: "score", order: "desc"})}>
          Du + populaire au - populaire
        </Dropdown.Item>
        <Dropdown.Item value="6" onClick={setSortParams({name: "score", order: "asc"})}>
          Du - populaire au + populaire
        </Dropdown.Item>
        <Dropdown.Item value="7" onClick={setSortParams({name: "tagsNumber", order: "desc"})}>
          Trier par tag
        </Dropdown.Item>
      </DropdownButton>
    </Fragment>
  );
};
export default SortProfile;
