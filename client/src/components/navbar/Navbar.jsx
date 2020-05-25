import React, { useEffect, Fragment } from "react";
import { Navbar, NavDropdown, Badge, Nav } from "react-bootstrap";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCog } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../api/auth";
import { useState } from "react";
import Notifications from "./Notifications";
import { getNotificationsNumber } from "../../api/notifications";

const NavbarHeader = ({ socket }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsNumber, setNotificationsNumber] = useState(null);

  const a = () => {
    // console.log("je recois receive notifications");
    // console.log(notificationsNumber);
    setNotificationsNumber((x) => {
      if (x === null) return 0;
      else return x + 1;
    });
  };

  useEffect(() => {
    getNotificationsNumber().then((data) => {
      if (!data) return;
      else if (data.err) {
        //err
      } else {
        setNotificationsNumber(data.notificationsNumber);
      }
    });
  }, []);

  useEffect(() => {
    // console.log(notificationsNumber);
    // console.log("init receive notifications: ", socket);
    socket.on("receiveNotification", a);
    return () => {
      // console.log("remove receive notifications");
      socket.removeListener("receiverNotification", a);
    };
  }, [socket]);

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
          <div
            style={{ position: "relative" }}
            className="notifications-container"
          >
            <NavDropdown
              className="mt-1"
              onClick={() => {
                setNotificationsNumber(0);
                setShowNotifications(!showNotifications);
              }}
              title={
                <Fragment>
                  <FontAwesomeIcon
                    icon={faBell}
                    className="fa-lg navbar-tab icon"
                  />
                  <sup className="sup-notification-icon">
                    <Badge pill>
                      {notificationsNumber ? notificationsNumber : 0}
                    </Badge>
                  </sup>
                </Fragment>
              }
              id="basic-nav-dropdown"
              alignRight
            >
              <Notifications showNotifications={showNotifications} />
            </NavDropdown>
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
