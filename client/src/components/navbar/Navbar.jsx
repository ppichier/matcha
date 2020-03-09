import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCog } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../api/auth";
// localStorage.getItem("jwt")
// jwt.user._d
const NavbarHeader = () => {
  const handleLogout = () => {
    if (typeof window != "undefined") {
      if (localStorage.getItem("jwt")) {
        logout()
          .then(data => {
            localStorage.removeItem("jwt");
          })
          .catch(err => console.log(err));
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
          <Nav.Link href="#home">
            <span className="navbar-tab">Popularite</span>
            <sup className="sup-notification-text">
              <Badge
                style={{ backgroundColor: "#FFDC80", color: "white" }}
                pill
              >
                9
              </Badge>
            </sup>
          </Nav.Link>
          <Nav.Link href="#link1">
            <span className="navbar-tab">Recherche</span>
          </Nav.Link>
          <Nav.Link href="#link2">
            <span className="navbar-tab">Chat</span>
            <sup className="sup-notification-text">
              <Badge
                style={{ backgroundColor: "#FCAF45", color: "white" }}
                pill
              >
                99+
              </Badge>
            </sup>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Nav className="navbar-container">
          <Nav.Link href="#home">
            <div>
              <FontAwesomeIcon
                icon={faBell}
                className="fa-lg mr-2 navbar-tab"
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
              <FontAwesomeIcon icon={faCog} className="fa-lg navbar-tab" />
            }
            id="basic-nav-dropdown"
            alignRight
          >
            <NavDropdown.Item href="/profile/me">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/login" onClick={handleLogout}>
              Déconnexion
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavbarHeader;
