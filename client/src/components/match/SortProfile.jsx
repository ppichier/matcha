import React, { Fragment, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { sortProfile } from "../../api";

const SortProfile = () => {
  const [sort, setSort] = useState("");

  const handleChange = target => () => {
    setSort(target);
    sortProfile({
      sort: target
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
        <Dropdown.Item value="1" onClick={() => handleChange("age+")}>
          Du + jeune au + âgé
        </Dropdown.Item>
        <Dropdown.Item value="2" onClick={() => handleChange("age-")}>
          Du + âgé au + jeune
        </Dropdown.Item>
        <Dropdown.Item value="3" onClick={() => handleChange("distance+")}>
          Du + loin au + près
        </Dropdown.Item>
        <Dropdown.Item value="4" onClick={() => handleChange("distance-")}>
          Du + près au + loin
        </Dropdown.Item>
        <Dropdown.Item value="5" onClick={() => handleChange("score+")}>
          Du + populaire au - populaire
        </Dropdown.Item>
        <Dropdown.Item value="6" onClick={() => handleChange("score-")}>
          Du - populaire au + populaire
        </Dropdown.Item>
        <Dropdown.Item value="7" onClick={() => handleChange("tag")}>
          Trier par tag
        </Dropdown.Item>
      </DropdownButton>
    </Fragment>
  );
};
export default SortProfile;
