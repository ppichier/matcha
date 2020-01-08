import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import "./Navbar.css";

const NavbarHeader = () => {
  return (
    <div>
      <Navbar bg="light" expand="md">
        <Navbar.Brand href="#home">Matcha</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">
              Popularité{" "}
              <Badge pill variant="danger">
                10
              </Badge>
            </Nav.Link>
            <Nav.Link href="#link">Chat</Nav.Link>
            <Nav.Link href="#link">match</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link href="#home">
              <div>
                <i className="fa fa-bell fa-lg mr-2 text-muted"></i>
                <Badge pill variant="danger">
                  4
                </Badge>
              </div>
            </Nav.Link>
            <NavDropdown
              title={<i className="fa fa-cog fa-lg text-muted" />}
              id="basic-nav-dropdown"
              alignRight
            >
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Déconnexion
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
export default NavbarHeader;
