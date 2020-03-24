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

  const [matchPeople, setMatchPeople] = useState([
    {
      userUuid: "123",
      pseudo: "ppichier",
      profileImage: "base64 ou link",
      lastMsg: "lastMessage"
    },
    {
      userUuid: "456",
      pseudo: "ppichier",
      profileImage: "base64 ou link",
      lastMsg: "lastMessage"
    }
  ]);

  const [guestInfosToDisplay, setGuestInfosToDisplay] = useState(null);

  // const [messages, setMessages] = useState({ from: "blab", allMessages: [{}] });

  useEffect(() => {
    //fetch for get all match in db (name, userUuid, online?, picture, last message)
    // server will send list of match user [{socketId: "9876", userUuid: "1235", "pseudo": }]
  });
  // socket.emit("join chat", () => {});
  // socket.emit("send message")/ user send message with socket id or userUuid in params.
  // Server listen to this event and send this message to all socket who are associate with this userUuid.
  // Before
  // socket.on("receive message")/ user receive message from a user

  const extractGuestInfos = guestIndex => {
    // fetch all messages from guest index and setGuestInfosToDisplay them
    setGuestInfosToDisplay({ guestUuid: "345", name: "toto", messages: [] });
  };

  return (
    <Fragment>
      <NavbarHeader />
      <Container fluid className="px-0 chat-container">
        <Row className="chat-row" noGutters>
          <Col md={3} className="chat-col1">
            <ChatPeople
              matchPeople={matchPeople}
              sendGuestIndex={i => extractGuestInfos(i)}
            />
          </Col>
          <Col md={9} className="chat-col2">
            <ChatMessages
              socket={socket}
              guestInfosToDisplay={guestInfosToDisplay}
            />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default Chat;
