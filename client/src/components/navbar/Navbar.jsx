import React, { useEffect } from "react";
import { Navbar, NavDropdown, Badge, Nav } from "react-bootstrap";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCog } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../api/auth";
import { useState } from "react";
import Notifications from "./Notifications";
import { getNotificationsNumber } from "../../api/notifications";

const NavbarHeader = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsNumber, setNotificationsNumber] = useState(0);

  useEffect(() => {
    getNotificationsNumber().then((data) => {
      console.log(data.notificationsNumber);
      if (!data) return;
      else if (data.err) {
        //err
      } else {
        setNotificationsNumber(data.notificationsNumber);
      }
    });
  });

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

  const handleNotifications = () => {
    setShowNotifications(!showNotifications);
    setNotificationsNumber(0);
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
          <div
            className="notifications-container"
            onClick={() => handleNotifications()}
          >
            <FontAwesomeIcon
              icon={faBell}
              className="fa-lg mr-0 navbar-tab icon"
            />
            <sup className="sup-notification-icon">
              <Badge pill>
                {notificationsNumber ? notificationsNumber : null}
              </Badge>
            </sup>
            <div
              style={{
                position: "absolute",
                top: "50px",
                right: "14px",
                zIndex: "1000",
              }}
            >
              <Notifications showNotifications={showNotifications} />
            </div>
          </div>
          <NavDropdown
            className="mt-1"
            title={
              <FontAwesomeIcon icon={faCog} className="fa-lg navbar-tab icon" />
            }
            id="basic-nav-dropdown"
            alignRight
          >
            <NavDropdown.Item href="/profile/me" className="drop">
              Profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              href="/login"
              onClick={handleLogout}
              className="drop"
            >
              Déconnexion
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavbarHeader;
