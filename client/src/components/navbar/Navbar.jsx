import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import "./Navbar.css";

const NavbarHeader = () => {
  return (
    <Navbar variant="dark" expand="md" className="navbar-main">
      <Navbar.Brand href="#home">
        <img
          alt="logo"
          src="https://previews.123rf.com/images/putracetol/putracetol1706/putracetol170603182/80692615-letra-m-icono-elemento-de-dise%C3%B1o-del-logotipo.jpg"
          width="40"
          height="40"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Nav.Link href="#home">Match Moi !</Nav.Link>
          <Nav.Link href="#home">
            Popularite
            <sup className="sup-notification-text">
              <Badge style={{ backgroundColor: "#fad5c0" }}>4</Badge>
            </sup>
          </Nav.Link>
          <Nav.Link href="#link">Recherche</Nav.Link>
          <Nav.Link href="#link">
            Chat
            <sup className="sup-notification-text">
              <Badge variant="danger">4</Badge>
            </sup>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>

      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <Nav.Link href="#home">
            <div>
              <i className="fa fa-bell fa-lg mr-2 "></i>
              <sup className="sup-notification-icon">
                <Badge variant="danger">4</Badge>
              </sup>
            </div>
          </Nav.Link>
          <NavDropdown
            title={<i className="fa fa-cog fa-lg " />}
            id="basic-nav-dropdown"
            alignRight
          >
            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Déconnexion</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavbarHeader;
