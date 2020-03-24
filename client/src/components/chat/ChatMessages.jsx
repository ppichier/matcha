import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import "./ChatMessages.css";
import ChatMessagesInput from "./ChatMessagesInput";
import ChatMessagesDisplay from "./ChatMessagesDisplay";

const ChatMessages = ({ socket, uuid, guestInfosToDisplay }) => {
  const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.emit("join", "userUuid", "guestUuid", messages => {
      //   console.log(messages);
      //get all messages between user and guest
      setAllMessages([...messages]);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("message", message => {
      setAllMessages([...allMessages, message]);
    });
  }, [socket, allMessages]);

  const sendMessage = e => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", "userUuid", "guestUuid", message, () =>
        setMessage("")
      );
    }
  };

  //   console.log(message);
  //   console.log(allMessages);
  return (
    <Fragment>
      <div style={{ height: "92%" }}>
        <ChatMessagesDisplay guestInfosToDisplay={guestInfosToDisplay} />
      </div>
      <div className="chat-messages-container-input">
        <ChatMessagesInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </Fragment>
  );
};

export default ChatMessages;
