import React, { Fragment } from "react";
import { useEffect } from "react";
import "./Chat.css";
import NavbarHeader from "../navbar/Navbar";
import ChatPeople from "./ChatPeople";
import ChatMessages from "./ChatMessages";
import { Row, Col, Container } from "react-bootstrap";
import { useState } from "react";

const Chat = ({ socket }) => {
  const [uuid, setUuid] = useState(null);
  const [guestInfos, setGuestInfos] = useState({ uuid: null });
  const [messageNotification, setMessageNotification] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    setUuid(JSON.parse(localStorage.getItem("jwt")).user._id);
  }, []);

  const sendMessageNotification = (uuidToNotify) => {
    setMessageNotification(uuidToNotify);
  };

  const sendLastMessage = (msg) => {
    setLastMessage(msg);
  };

  return (
    <Fragment>
      <NavbarHeader />
      <Container fluid className="px-0 chat-container">
        <Row className="chat-row" noGutters>
          <Col md={3} className="chat-col1">
            <ChatPeople
              socket={socket}
              uuid={uuid}
              sendGuestInfos={(value) => {
                setGuestInfos({ ...value });
                setMessageNotification(null);
              }}
              messageNotification={messageNotification}
              lastMessage={lastMessage}
            />
          </Col>
          <Col md={9} className="chat-col2">
            <ChatMessages
              socket={socket}
              guestInfos={guestInfos}
              uuid={uuid}
              sendMessageNotification={(value) =>
                sendMessageNotification(value)
              }
              sendLastMessage={(value) => sendLastMessage(value)}
            />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default Chat;
