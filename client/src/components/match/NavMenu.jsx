import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCog } from "@fortawesome/free-solid-svg-icons";
import "./MatchMe.css";

const NavMenu = () => {
  return (
    <Navbar
      variant="dark"
      expand="md"
      sticky="bottom"
      className="style_menu"
    ></Navbar>
  );
};
export default NavMenu;
