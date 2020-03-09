import React, { Fragment, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { sortProfile } from "../../api";

const SortProfile = () => {
  const [filter, setFilter] = useState("");
  const handleChange = i => event => {
    setFilter(i);
    sortProfile({
      filter
    }).catch(err => console.log(err));
  };

  return (
    <Fragment>
      <DropdownButton
        id="dropdown-basic-button"
        title="Trier"
        variant="outline-info"
        className="style-menu px-4 py-4 my-3 mt-1"
      >
        <Dropdown.Item value="1" onClick={handleChange(1)}>
          Du + jeune au + âgé
        </Dropdown.Item>
        <Dropdown.Item value="2" onClick={handleChange(2)}>
          Du + âgé au + jeune
        </Dropdown.Item>
        <Dropdown.Item value="3" onClick={handleChange(3)}>
          Du + loin au + près
        </Dropdown.Item>
        <Dropdown.Item value="4" onClick={handleChange(4)}>
          Du + tag en commun
        </Dropdown.Item>
        <Dropdown.Item value="5" onClick={handleChange(5)}>
          Du + populaire au - populaire
        </Dropdown.Item>
        <Dropdown.Item value="6" onClick={handleChange(6)}>
          Du - populaire au + populaire
        </Dropdown.Item>
      </DropdownButton>
    </Fragment>
  );
};
export default SortProfile;
