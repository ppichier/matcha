import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCog } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../api/auth";

const NavbarHeader = () => {
  const handleLogout = () => {
    if (typeof window != "undefined") {
      if (localStorage.getItem("jwt")) {
        logout()
          .then((data) => {
            localStorage.removeItem("jwt");
          })
          .catch((err) => console.log(err));
      }
    }
  };
  return (
    <Navbar variant="dark" expand="md" className="navbar-main">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="navbar-container">
          <Nav.Link href="/match">
            <span className="navbar-tab">Match Moi !</span>
          </Nav.Link>
          <Nav.Link href="/popularity">
            <span className="navbar-tab">Popularite</span>
          </Nav.Link>
          <Nav.Link href="/chat">
            <span className="navbar-tab">Chat</span>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Nav className="navbar-container">
          <Nav.Link href="#home">
            <div>
              <FontAwesomeIcon
                icon={faBell}
                className="fa-lg mr-2 navbar-tab icon"
              />
              <sup className="sup-notification-icon">
                <Badge
                  style={{ backgroundColor: "#FCAF45", color: "white" }}
                  pill
                >
                  4
                </Badge>
              </sup>
            </div>
          </Nav.Link>
          <NavDropdown
            className="mt-1"
            title={
              <FontAwesomeIcon icon={faCog} className="fa-lg navbar-tab icon" />
            }
            id="basic-nav-dropdown"
            alignRight
          >
            <NavDropdown.Item href="/profile/me" className="drop">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/login" onClick={handleLogout} className="drop">
              Déconnexion
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavbarHeader;
