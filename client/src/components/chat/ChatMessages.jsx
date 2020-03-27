import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import "./ChatMessages.css";
import ChatMessagesInput from "./ChatMessagesInput";
import ChatMessagesDisplay from "./ChatMessagesDisplay";

const ChatMessages = ({ socket, guestInfos, uuid }) => {
  const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState("");

  // console.log(guestInfos);

  useEffect(() => {
    socket.emit("join", "userUuid", "guestUuid", messages => {
      //   console.log(messages);
      //get all messages between user and guest
      setAllMessages([...messages]);
    });
    // return () => {
    //   socket.off();
    // };
  }, [socket]);

  useEffect(() => {
    socket.on("message", message => {
      //get single message in live
      // console.log(guestInfos);
      console.log("Reception du message: ", message);
      if (
        (message.from === guestInfos.uuid && message.to === uuid) ||
        (message.from === uuid && message.to === guestInfos.uuid)
      ) {
        console.log("HERE");
        setAllMessages([...allMessages, message]);
      }
      //store in db the message regarding uuid and guest id
    });
    return () => {
      socket.off();
    };
  }, [socket, guestInfos, allMessages]);

  const sendMessage = e => {
    e.preventDefault();
    if (guestInfos && message) {
      // console.log(guestInfos);
      socket.emit("sendMessage", guestInfos.uuid, message, () =>
        setMessage("")
      );
    }
  };

  //   console.log(message);
  //   console.log(allMessages);
  return (
    <Fragment>
      <div style={{ height: "92%" }}>
        <ChatMessagesDisplay
          guestInfos={guestInfos}
          allMessages={allMessages}
          uuid={uuid}
        />
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
