import React, { Fragment } from "react";
import { useEffect } from "react";
import "./Chat.css";
import NavbarHeader from "../navbar/Navbar";
import ChatPeople from "./ChatPeople";
import { Row, Col, Form, Button, Container, Toast } from "react-bootstrap";

const Chat = ({ socket }) => {
  console.log(socket);

  const [matchPeople, setMatchPeople] = [
    { pseudo: "ppichier" },
    { pseudo: "maxou" }
  ];

  useEffect(() => {
    //fetch for get all match in db
    // server will send list of match user [{socketId: "9876", userUuid: "1235", "pseudo": }]
    //fetch all messages
  });
  socket.emit("join chat", () => {});
  // socket.emit("send message")/ user send message with socket id or userUuid in params.
  // Server listen to this event and send this message to all socket who are associate with this userUuid.
  // Before
  // socket.on("receive message")/ user receive message from a user
  return (
    <Fragment>
      <NavbarHeader />
      <Container fluid className="px-0 chat-container">
        <Row style={{ height: "100%" }} noGutters>
          <Col
            md={3}
            style={{
              backgroundColor: "#fff",
              borderRight: "2px solid ##e0e4e9",
              height: "100%"
            }}
          >
            <ChatPeople matchPeople={matchPeople} />
          </Col>
          <Col md={9}>
            {/* <MatchMessages></MatchMessages> */}
            Col2
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default Chat;
