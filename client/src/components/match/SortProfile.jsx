import React, { Fragment, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const SortProfile = () => {
  const [values, setValues] = useState("");
  const handleChange = event => {
    event.preventDefault();
    console.log(event.target.values);
    setValues(event.target.value);
  };
  // console.log(values);
  return (
    <Fragment>
      <DropdownButton
        id="dropdown-basic-button"
        title="Trier"
        variant="outline-info"
        className="style-menu px-4 py-4 my-3 mt-1"
      >
        <Dropdown.Item value="1" onClick={handleChange}>
          Du + jeune au + âgé
        </Dropdown.Item>
        <Dropdown.Item value="2" onClick={handleChange}>
          Du + âgé au + jeune
        </Dropdown.Item>
        <Dropdown.Item value="3" onClick={handleChange}>
          Du + loin au + près
        </Dropdown.Item>
        <Dropdown.Item value="5" onClick={handleChange}>
          Du + tag en commun
        </Dropdown.Item>
        <Dropdown.Item value="6" onClick={handleChange}>
          Du + populaire au - populaire
        </Dropdown.Item>
        <Dropdown.Item value="7" onClick={handleChange}>
          Du - populaire au + populaire
        </Dropdown.Item>
      </DropdownButton>
    </Fragment>
  );
};
export default SortProfile;
