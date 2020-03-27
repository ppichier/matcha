import React, { Fragment } from "react";
import { useEffect } from "react";
import "./Chat.css";
import NavbarHeader from "../navbar/Navbar";
import ChatPeople from "./ChatPeople";
import ChatMessages from "./ChatMessages";
import { Row, Col, Container } from "react-bootstrap";
import { useState } from "react";

const Chat = ({ socket }) => {
  // console.log(socket);

  const [uuid, setUuid] = useState(null);
  const [guestInfos, setGuestInfos] = useState(null);
  // const [messages, setMessages] = useState({ from: "blab", allMessages: [{}] });

  useEffect(() => {
    setUuid(JSON.parse(localStorage.getItem("jwt")).user._id);
    console.log(JSON.parse(localStorage.getItem("jwt")).user._id);
  }, []);

  useEffect(() => {
    //fetch for get all match in db (name, userUuid, online?, picture, last message)
    // server will send list of match user [{socketId: "9876", userUuid: "1235", "pseudo": }]
  });
  // socket.emit("join chat", () => {});
  // socket.emit("send message")/ user send message with socket id or userUuid in params.
  // Server listen to this event and send this message to all socket who are associate with this userUuid.
  // Before
  // socket.on("receive message")/ user receive message from a user

  useEffect(() => {
    console.log(guestInfos);
    if (guestInfos && guestInfos.guestUuid !== null) {
      //fetch messages relative to guestUuid and store in state
    }
  }, [guestInfos]);

  return (
    <Fragment>
      <NavbarHeader />
      <Container fluid className="px-0 chat-container">
        <Row className="chat-row" noGutters>
          <Col md={3} className="chat-col1">
            <ChatPeople sendGuestInfos={value => setGuestInfos({ ...value })} />
          </Col>
          <Col md={9} className="chat-col2">
            <ChatMessages socket={socket} guestInfos={guestInfos} uuid={uuid} />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default Chat;
